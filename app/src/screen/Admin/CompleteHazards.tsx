import { 
  Image, StyleSheet, Text, TouchableOpacity, View, 
  Modal, ActivityIndicator 
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import CustomStyle from '../../CustomStyle';
import { Camera } from 'react-native-vision-camera';
import { useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../../axiosConfig';

const Cloudurl = 'https://api.cloudinary.com/v1_1/dftwre0on/image/upload';

const CompleteHazards = ({ navigation, route }) => {
    const device = useCameraDevice('back'); 
    const cameraRef = useRef(null);
    const [cameraVisible, setCameraVisible] = useState(false);
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [currentImage, setCurrentImage] = useState("image1");
    const { hasPermission, requestPermission } = useCameraPermission();
    const [isUploading, setIsUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    const { hazard } = route.params;

    useEffect(() => {
        console.log(hazard);
    }, []);

    const handleImgToCloud = async (uri) => {
        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', {
            name: `image${Date.now()}`,
            type: 'image/jpg',
            uri: uri,
        });
        formData.append('upload_preset', 'User_imges');
        formData.append('cloud_name', 'dftwre0on');

        try {
            const Cloudresponse = await fetch(Cloudurl, {
                method: 'post',
                body: formData,
            });
            const res = await Cloudresponse.json();
            console.log('Cloudresponse', res);
            setIsUploading(false);
            return res.url;
        } catch (error) {
            console.error('Image upload error', error);
            setIsUploading(false);
            return null;
        }
    };

    const handleSubmit = async () => {
        if (!image1 || !image2) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Please capture both images',
            });
            return;
        }

        setLoading(true);
        const imgUrl1 = await handleImgToCloud(image1);
        const imgUrl2 = await handleImgToCloud(image2);

        if (!imgUrl1 || !imgUrl2) {
            setLoading(false);
            Toast.show({
                type: 'error',
                text1: 'Upload Failed',
                text2: 'Could not upload images. Try again.',
            });
            return;
        }

        
        try {
            const res = await axiosInstance.post('/hazard/resolveHazard', {
                id: hazard._id,
                description: "Hazard Resolved",
                image1: imgUrl1,
                image2: imgUrl2,
            });
         console.log(res.data);
         
            if (res.data) {
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Hazard resolved successfully!',
                });
                navigation.navigate('ResolveActive');
            }
        } catch (error) {
            console.error("Error submitting data", error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Submission failed, please try again.',
            });
        }

        setLoading(false);
    };

    const openCamera = async () => {
        if (!hasPermission) {
            await requestPermission();
        }
        if (hasPermission && device) {
            setCameraVisible(true);
        } else {
            console.warn("Camera permission denied or device unavailable");
        }
    };

    const captureImage = async () => {
        if (cameraRef.current && device) {
            const photo = await cameraRef.current.takePhoto();
            const photoUri = `file://${photo.path}`;

            if (currentImage === 'image1') {
                console.log(photoUri);
                setImage1(photoUri);
            } else {
                setImage2(photoUri);
            }
            setCameraVisible(false);
        }
    };

    return (
        <View style={{ flex: 1, padding: 10 }}>
            {cameraVisible && (
                <Modal animationType="slide" visible={cameraVisible}>
                    <View style={{ flex: 1 }}>
                        <Camera
                            style={StyleSheet.absoluteFill}
                            device={device}
                            isActive={cameraVisible}
                            photo={true}
                            ref={cameraRef}
                        />
                        <TouchableOpacity
                            onPress={captureImage}
                            style={styles.captureButton}>
                            <Text>Capture</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => setCameraVisible(false)}>
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            )}

            <Text style={styles.title}>Resolve The Hazard</Text>
            <Text style={styles.hazardText}>Hazard: {hazard.hazard_type}</Text>
            <Image style={styles.hazardImage} source={{ uri: hazard.image }} />

            <Text style={styles.uploadTitle}>Upload Resolved Work</Text>

            <View style={styles.imageUploadContainer}>
                <TouchableOpacity onPress={() => { openCamera(); setCurrentImage('image1'); }}>
                    <Image style={styles.uploadImage} source={{ uri: image1 || "https://www.pngplay.com/wp-content/uploads/8/Upload-Icon-Logo-PNG-Clipart-Background.png" }} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { openCamera(); setCurrentImage('image2'); }}>
                    <Image style={styles.uploadImage} source={{ uri: image2 || "https://www.pngplay.com/wp-content/uploads/8/Upload-Icon-Logo-PNG-Clipart-Background.png" }} />
                </TouchableOpacity>
            </View>

            {isUploading && <ActivityIndicator size="large" color={CustomStyle.primary} />}
            
            <TouchableOpacity disabled={loading} onPress={handleSubmit} style={styles.submitButton}>
                {loading ? <ActivityIndicator color="white" /> : <Text style={styles.submitText}>Submit</Text>}
            </TouchableOpacity>
        </View>
    );
};

export default CompleteHazards;

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    hazardText: {
        fontSize: 16,
        marginBottom: 10,
    },
    hazardImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    uploadTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },
    imageUploadContainer: {
        flexDirection: 'row',
        gap: 15,
        marginVertical: 20,
    },
    uploadImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    captureButton: {
        position: 'absolute',
        bottom: 50,
        left: '50%',
        transform: [{ translateX: -50 }],
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 50,
    },
    cancelButton: {
        position: 'absolute',
        bottom: 60,
        left: '80%',
        transform: [{ translateX: -50 }],
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 30,
    },
    submitButton: {
        backgroundColor: CustomStyle.primary,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        opacity: 0.8,
    },
    submitText: {
        color: 'white',
        fontSize: 18,
    },
});
