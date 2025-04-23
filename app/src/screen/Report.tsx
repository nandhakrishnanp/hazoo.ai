import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View ,Pressable} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Camera } from 'react-native-vision-camera';
import { useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import CustomStyle from '../CustomStyle';

const Report = ({navigation}:any) => {
  const hazards = [
    {
      name: 'Potholes & Cracks',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKPmpciUONLmQQI4G2R_LxQC8K3B6WUsYsaQ&s',
    },
    {
      name: 'Fallen Debris',
      img: 'https://media.istockphoto.com/id/648108652/photo/large-tree-fallen-across-road.jpg?s=612x612&w=0&k=20&c=KfksoWu5HAeUDPCC3jvjWqkphAbWb7q2JKKS4nzm4Uk=',
    },
    {
      name: 'Accidents',
      img: 'https://ichef.bbci.co.uk/images/ic/1920x1080/p050q1w8.jpg',
    },
    {
      name: 'Animal Crossing',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm81GGAvjNwCuEJ4Bm5-1KO5G7lyrwE9NEHA&s',
    },
    {
      name:'RoadSide Dumps',
      img:'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExQWFRUXGBsaGRgXFxodGxsgIiAaHyEgHSIgHiojGh0lGx8dIjEiJSkrLi4wIB8zODMtNygtLisBCgoKDg0OGxAQGy0lICYtLS0vLystLS0vLy8yLS0tLS0vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAMcA/QMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAEBQIDBgABB//EAD8QAAIBAgQEBQIDBgUDBAMAAAECEQMhAAQSMQUiQVEGEzJhcYGRUqGxFCNCwdHwFTNi4fFTcoIWJJLSQ4Oi/8QAGgEAAwEBAQEAAAAAAAAAAAAAAQIDBAAFBv/EACsRAAICAgICAgIABQUAAAAAAAABAhEDIRIxQVEEIhNhMnGRofBSgbHB0f/aAAwDAQACEQMRAD8ARZTK6aapUI1JsRIIEt7WuNzsYMwbFNTXQAQANhC7zcTeN/5bDC7huW82wYgoSI6i5tfdTe+GTUWICXhQCRM6rz9rCRfYbdcEtPszv9lnDqiqNFQk/wAOoCO4/KJn9cWVgjVXpsNS6Y1MQGuGhuxIb+Z2mDaekG5BUyZswg263Nh+WLMnkg0kxrUgwQYmxHTmXrucS5pO2dGSRXw/K09BDgDUdUFhAYTBAuVYEzpsBHtGLaXAwjM2uAFJ1SdUbbdOXYhiLDA3E6emI1gxBAkrtFvgWv07YI4NTq6lJBQTpKsSJtaA0c3039pxXHFz2jp5PJVw2hUXzCxk7IDaewMnkk9ASBMdMPuBcHNNlrVILBSSqyADIuDpCmQIgflvgLjmWVUqMHNBiInfSZWGg+1jvY/GBsi9VKNP96LqNWlhE8pMiIvPb/a0Eo78k1k1cl/Q1iNX85iqnyip0y6WJvETP54IyfEq6AUzROkCNWoEk97En8sJuH+JGYkHTpW03A2J5iJ0ix6Rgmnx6uTpFCmzdNNcEH39Nx8YtGWRq0tFI/jfTY349xoUstDN5buNKldwOrD4G30+MZ2l4jqUkBSp5jgxzA6WFieg0GOpH3kYn4sq0obVTPnNBUELFhHeYkzIsZ74yGXu2luXmAKzAveRERc/ltgvJuic27PsPAuMrmKSvZWIumoEiDH1HY4Zahj5L4W4rVp1UKAtT8wU3ESF1QBfoSQBv064+sK2KLaLQna2SDfP2xCuW0nTv0mIxZOF/Ha6JSmo2lNShiOxIBFrwRvHTHDmE8SZ/wDevOhm5V1U5iQLfrHXCfNcRQ6kItpFyCYtNok9Zxp+PZ7L1KYpUAuncsg5rCRAiPue+Pn2YzZNZS6yCQY6WO7dWkyNx1tiLhbFbTNHmnWkmWZQCNLrrcXHOxIAMQf6YMy/iFBCJr1LM6Zk2JuR0m/sBjO8fqzTytg8ecN2Is4HfeD1OKHqMyk9N4idh1IvEe94GA++xZypn1fwr4iGYmmVIZFEmZnpf8Jnvvh7mq+hS2lnjook4+W+BxrpGuaxpHzNIEqobSAQeYcw5j9sabL+JqlUlaUTrKgsrAW7bSCATPzgrItotCMqTaCV8S1aj6adEAdWaSOvaPsJwxOerD/pfZv64yfA81mauYp62C0yKxKIoAOioKYvve5xrvIHbEFOb8miSiukRPEK34aZ+rf0OPP8Urf9JD/+w/8A0xKmR0GPVX9ThuU/YtR9Gf4ZxF2z+bqeWDoSjSgPt6nMHTf1Dtht/ijhpak0dAGH8yB+WMzwDilCkuarVaqKamZqsBqGoqulBA3Pp/PCjP8Aizz6BpMBRqM0atUpAvZoG8dY/lg853oElGro+hHj6SqwRUYxpN4vEnTNvjFeb8U0VspLk2EC0+5MCPfbHyvL5tYinUDd2Rg3U9QSAP7vi5HJIm3XfeJm8QNumH/JP0Y3kfo+rVeNJoDU/wB4WMKqXJPY/hHucY/xXmKy1QCyzE3Chb9F5GJ9yT9MCcL8QU6CMC8FlsOYhbDtJBJ+dhcYRDixP4aokwagFvYAkwMPNvigW2Kctk+YMCFIiCCVtA0welu9sMv2Q6bgQZmZtMz0vJjef6gplarQwFgQhURBViIO2+osPqPjBkMHIZgh9hupMEG+4PUd9sedJnPssqVvLCEjUHgQOgiZB2MCPuMeZaQ7SNWqYi20wAD1sT98W/s/KFBgqQYt8AyZEQBcixx1eh5kBW1QRKe2xNvqO/3jE7ROaCvMswdSSQZU3XY3F7Se3tgFqdMzTYlBEjT5iiRBAJaUtIPqGOyUoZntaDAN1Mb29rQAu4wQtEG4kTNwSvQiSRcxe+KQlxFqkKsxQLKVeo/MS27mekwx3tNrbG9jiNKuo1IDsY+RJbYe0C+GOZoTTDGeUgTBnoIkgSJvJHU7mZSaAapQCSYFxvqt/cXxtg7Rrx1xNZ4LRQ41AzoaRG8tSAI7jm/XGmORpGrSqU2ZC8tABCvAElgRAMRexxnfDquc2QxAmmdJtEgoY+wn6HGtoD/IPUM6z9G/pjZg1CjNlgoz0I/HwirlgELFg6iBP4I+5OMNmKTebplKYkEFoiZF2ty3iTj7DWpI8MRqI2Jm18fKPFGWAzVamqag1SpAALEGQTaO7A/bGWUeM+Q84eUb/wAC8NZBXqMyslSpKwL8pO/uJj6TjR/t6HZtiJkEfr098fOKeZB5HqBVXVqUl1UhlDCYNyJ3A64YZ39+NKFwA0mEawkXNvwkn5GK89aRfHjtGnzPiqir6AwP+sEFR9ROMx4p8QmpT02IMxOna3a4JFv64a5GmGoHSoI0kSbTv0j363xluPcaSpUOXNNQyHuA3Tm+CJsPbbE8k6WznFLVirJ5oh0ct5Sg6dS2YDaxEdwPuMR4/kUpim9FzU1o7m0aSAR27j+5wuzhFRQKbKoDvpAESOSB7mT2GNPw7w5QbLv5mZrJD6X0oNMkajBYAwPt98LDfRKD2L+OKBTologVMzMn3RgPffbCutVcFpFoAF4gz1vY37Y1XibhoSlRYTV01GdSsAgMogmT3XCoAuFFSmy6yQNUsCQdPawJ2vaDiU7spLE3I3/h1V/YqE6RyK0kjrcmeu+EXiXxCqmctVpk07EeVqgmJ5vMVQYO1+vvhB4gpsKHLqYqDqVbALFQGQLleVTBPf2g7hj0qVKI2DXgdOg7X6C3xi0MEa5tjyyu+CFec4pnioHnNSST+8DqogkMbgBdzbffe4wBmM9RWWXM1ifarJJ78oI+rEYdcZ4PS/zSoMyoBA9TCx+n3sMIuLZammfoUwT5Uc8AxHMftMYaSKRi+Kfsm/G67XQ1iTcl6zj8lMYlUfNVJNWq0XkSzWif4iYj4GNAaCB1KLKc2pr2+kXnDPi6umUrf+2pKWQoKivLc1hY07mSLTiMpUUhHezJ8O4czAMKLszCQfLYwDflt1HUf1w5o8BzBBmnotu5UfzJH2/XGty2ar01VP2ZCEUKJrnYCB/+ONsG5PO1CssmhzNluAO0wJt7DE3BPtl1mktJJHzzLeFszWaWphQD6iCoInoTpwzz3hsUkDVs0iDoABJPbf8AScbCp5hmZPt2xS1By08lvxIGP0k2w/RncOW2fOUq5cmdFRj/AKiGHxYx73wxFGo6qaSVkW/+WEAN/ffAHGuJ/tFQlqNIFGYB0XSzAEgSe0Y0PhDL+bRZ9FNBrIHIGJgC5J9yRGEcE3u/6glg/ZlKiERTdWC2JOoLBB3knmW9vfFbi2plLRBDKwIFzYAd4MwbDcTbF9bMsoBSSlM+rdtAmQ5JM3AEnr84nl8hFHXSIlonSuoAAkryz17Da9rTiKMVHuYVjKC8pEcomY3G8XNhBgY6hWLUiLeaAFDAfrt0tB7joTiK5eo2k2gASVvBAiBIkAkdd/fF2SAOtSpILMCIBjsR2Jg+3taMLSoLpumUZmsVpeZu9xHv7820fW32upZuVWpvMflHawuOmKqtMmCGSQSWmRMfG9id+3ti3L5ZP4sxTM7rI/kRf3H/ADSKSQyw+lYZl85SqKy/iWHEm52EEmAwiRI9rYU0cuBVBkyh3gTcMAT1AvsbyfsY/CqcgmqsHYAAjp1g9b3xKrkDU5lGtgbFXEfXSRe3W23xh1+mP+CSWmDZfPpTqKxrKlRb3ZZuI6n5+/thzw/jrr5h81GXUrLcMQbapA7gWj8Z9sUVeG1NC6DLzLTTAX4kNv732Pti6nlcwfUAIFtI9uoLWveZ7YZSkvI6x+9nj+JK7E6agUSYUKOlpvJuZt8YTcRq6izGSzSSVgGTAJHQGw+owD4ipNQrlSW0sNckRub9TbVP5Yqy2Y1AdQL6v9uonCqUk9m9Y4OOka5OD5itSp1qbUKiNSAGsOGBChbgEW1qxPz7YU8U4kVzNULUakqAIygnmOlZPxJiD0Awf4Q42CvkarEkp7E3K+1+b/5YxfjWlUTiFZmVhTNRDqjlIIHUW3DD/wAT2xqi/RilcXRqeF+Iart+z1CRSYG6KJ2m8epbQcW8Uam+lWCmIg6RrgCIJ6D2GM/wWvyFzu2oDtuJj+++CkcliT9hjNnnU9G34vxoSjykaPhHFkFbQMtSQydDqpknfmkkljBMzP2wx4vxqkwqUszW5SNLICSxBHZQSDffGX4XQLPPUEXMGOpN9iAI/wDLtjJeeqw6WBmO17/ljsTcndi/IhGGkjbU+Jq48lWJCwE0hhqAAAsxlesKAfck4OzdUJToCqSAH1gaYPrv+Qn64xnCaT1MzQEi7JUO3pDgRbuYEe4x9bbLISSVBJ3sL/OLyM632YLNcSDLTPmtSJDauSeUlSVNuUtse2/TECytS5oPqaAbgkkwLXMxbrjaV+D0W3U/RmH6HAeU8OrScPTcyp1LqE6T9CJ+vc4HKXHj4BwjfLyJs1xYOwXyy1NXGtttLfwgHqZBHYg77TMZiiSWXTMydUySBAsdwP698WcU8O5upU1ftWpAzMtIrpUEmYkSSJvEdjgNvD2aBkrTP/Y5n8wMDzdj48koKkXOFcKoqjmZQFEdSABv742fihQRl6X/AFMxTn4WXb9MYDL5HNHMZValFlSnVDvUkRAuoMMZ5gLnGuz2a8zPZUSD5SVqm9pIWmB72YnAbR0W7s1JXHip2wOmYPUYtSuDg2gFpGAeL5oUqVSof4VLfYE4MDYzXjvN6co4vLQv3In8pwJdBitnzam8De/XH1Pwdl9GToj8S6//AJEt+hGPk3lM0IN2IUfJtj7WtIKqqNlAA+lsCLKZD49k63l1g1PUZW5OxMzFtriTOwxfw+nobUqHRrIV5GoAqLGLMAb3kdbXxLLFmpqpfnEmQoDG9otfpI267YZo2mFclSIlREDfsYHxJHTuMQkeW3sroUkKLV16WWRuYYbCbd7zF/gziS0iD5iQNyQI3IABA230naBHucCPVgwpaNzIiLbCSZGI080GVhBKmATY+4gzDzEDta4wnFnJ/YLfJ12YJzU5ZWFTWVXcSpgktIHSPnbBS5QenUrAAglgzkC5hgy3PS/3GF9LiLAjnEkABZ9MgEg9N4v16Rhvw3iAUNpdWP4WPKesW5hI74fxTH80yuotNSJqJB9IUaRG21v7nE4pCG9VzDJLbdiCYwqrZ01KyU/JqodJcIzjQwJBkuWBA7XG+C2yutAStPVpDaEMlrjknm1QtgwO/wB8P9Yum9muClXtB/8AiSKD6pBiCBM/c6frGGLMwQOTAiTEGPmB+e3vjK5PKqQvmKghDyB3YD+KSTqLSdwVA+uHlLhtJaLZqqawCrqVlflJJsERanqNgFI9vbFOKfR3J+RfxTTVr5V5LlKhUroubawIG5DoPzxRn8uRmMxo0UzVo0nRmAEOpdSALQSoEyInfDilxRqVVX8vSUVtIcgDmPq6kMB+RbuIq4vRSvVV9JytUqQarMERtyIQqfMneUjpJ6DlFUM5tGZqUx5AzC0lTMU2GoE2cQIqBZkc3Q7X3wdk+IHNZWplXOp9GlSQCbizGfVDifk+9rOJ8IZaRNPMq9NmJkagVYEmGFwt+pIuBfFXDcsuWdRQrU3qNSLDUKjEEgGx2A9ySQdMCSMFKSZzlFrZmcnmlKkKhBDCVOrUAYAE6oMQbEA33IsHHBszVq/u1VVUGdbSAeYrFgb2Pt1wZl6dAq4amyERU1moGcmwgQAtupYgQOu2LBw8oAqtRIAgEOWZNZnURIPqJI6XHTC5cbv7IphzpRqLI5Kk6B6lwVHoIs0rVie9wlsLshwyj54NakfJemjshUgIajFBEekAwx7AN2wTmHQVWqlm0voSmdlJXXIESQZ22PpJ6YKp5jy6pD17lFGlRqKm9mPq13LFSAI2IiCuKNBzzU2Gf4QtPiK+QqInkUtSgAARVF19yqfke+NiDOxxhkzDJNSpWAZyoK8sKF2DFr+qTEDfD/JZ4n1WMTEGcVslQ7xxUHAVPNiOo9uuLkzSmO/THHBAJHb7DHMfb9cQD9scTjrBRJRe5Edo/wB8eeUrCGVT+n54iceXwdHHj5JQIGpLRyuR+hxUuVqKZWoxn8UH+WLpx0nA4o62DvUzCSVlrbct/wAwcIeOZurUQLVpVEAM6lW2xFyTtf8AIY05J98drPfA4IPJmD4DXR8xSVKuvSdRUBTtNjDGIIx9ETNSTNj9sAZnK0an+YiMT+JVJ/O+BH4LQP8ADHwzgfYHCuHo7nfZhKWbCDUWZVtEBiAvTYTaLH2jbDds4jvVFOgx8tSC5ZoFpWAWXUIvpVpOEdKn5ZC1aIdi5IUuAIAi8WYierRve+GvEKtJtKeTToOUVQXZkLiBBlJR0B2ZmN5Eb4FKzMsaZfls0cwipSo0dEAOWJD3IkoXUQY95BjfAlTh4ylXX+0UxzaAa2k6VIutqdyZn1djYwcVZHKrUVhWomlGlVqVqiqgboqtpiTMCZA7iQcGjgtNNSmkq1DcedUCjpbkGx3k7iMF0uyyxuXSsHFU+b5qVxTYAq1WyqVYg8ocFd95X4NsPPDnF6oNR2C1ivIIo6acGSdJ031WJ2H64By+RKUiaYpAswJKuYExZTEWNoJ6QI2LDLVsqqjSVV5mooIHUMZiLmdpAuMdGS8BcHHTFT54uatSrT8s1FtS1agI2klNWx2DW7WwNRRmdmdKVEAgh0Zi0nflLEbHstxjWJxqkdTKpq0lUkqpuJtdT6lKkkG4sZuBjM5PVLVWIpByeS+qBtChQnWJH1G8F6VnX78D3hvE8spJeocuQSBYsGNhcIsfO0GRgUk5ivrp5yiAZI8yky6dxCKNIt3N9rnA2co5YAotE1KjCyBiX3EnSv4ZHLA3GwgYo4PkMo1QKMvVepF1Vm5YWJILAmdtKg9Ce+HtdMTtckOBmkpuylhnKpA0DywtNbX1AszEGBcA7iR1xpV4nmzSYeQlQaeVlZWRp6bgi3tHz1E8PcHzLrLK2UBcsQ1TzXcXiRJFMXuAZw3q8HrUgWo5hFY3IekSpPwHtJ6gffHR5t01S9h5Jdb/AJmH4dwGqivUAOWLGWTzVY/YWtMQZ6kk2IX8UpgaYCmQTrSoSGBO5VWKKTHQYNbiuabOsucpKwVWSnpDQpUsQ5h/QxEXg+i1sD59WJZzdiQYHt0HwMXxQk3asy/LzRglHVv+wb4aFB6VTL5hdS+oXadJsQCCCOb59Rwz4f4eyjKDQpUyDyz5jJAUlf4SGa4I/nvhH4ayHmVzrmPLadJibi24xL9vy6CoKdMEGo4WprMSBqiLqx1EtB7ggEjEs2p8X0ivw588XLz0MuLcGVUFLzKa1CCE0Ul5Vm1ixnqus/yuvpcPiCtM1F5iGpEJPNMEExpFisnvAi2AshmQ1ZHc0nXn1Iah8zbcACGGpoEEdLWxrVzKUqKUjrcaiJ1Q6iSyzAEQOW1z1kTiFpPZpcFCLaRVmuEVKiogqKBYpCgtfV6yDDAk3JIm3uSEnhh35KNUwg5grQLj4kGSb7fGBVyYSoawqGoh5b8oTVIiUWbyACDMm42imsEoFNFxBkVFDEqSLAs0lSJ3gENv2ZOuwRfNLi9DQioRrZkekANLUxpboJYEsDLdRa++OpZg9ZO3UT+gn8sVcZ4bRpCnWipBAFMUggUCDEAGIOojqfiBgWhxtUDCrlAzq4IC5gBnvZgpAYbXVgBta+DbG4ofZaqSBNj26j+vzgnUO+M1ks3TFRwWgE2Vukt6ZPNbUBb9cOaZB6EfP/Jx1gDCR3xxbFBnpiSn+zggLLY8nHkd8ekf2MA47VjwnEgD0Zh8Ej7xv9ceeWMGzjyceTiejEYxxxhsrRLsXpVJAHpNtQseltdouOljiVPxZUqqeUVjpJ1aWLW6x/DyxINiR84FXNUaFGpVDXiAUP7wsTHpmCQT0C2kwMVcO8P1KlHzctTaqjb6GUNIM3BqCSCdmj47zeKzo5YwWlv9ks3ncvVX95TJU3IR1ZDECQNIMRG98U5HguWqg1FzlWnTSy0xOrvpChjC9N+9xvg4+ExleZ5pEMApZqhYzcKCG8t725QxnaN8RzVbKggVqZcKZZKVTTpkQCSCGP2HuJ2pCEE92DJnyyj410D0KYQGlq1Kbq5qMt4iw2M2/iP1jDnIcJpuGao3kv5bAoCNMLtzAgqQBq1T1JPt5SzeQ0oRTqhmBIlnqKoVh1BKsbG4GwvBti+txVdQRxpB6or8pI1SSolRECbD3MiHy/jv6IhiWTf5GS4Pl3oVP3NHzdSBpqEhAZEmdLAmRMCbREbGHirL1a+ey7DVTU0zrRC0EwdR9OlplVuNh3MY8/xuoVLBZdW0nmKsZmCumQyaoBkzvYwMLs/4jqBxGp9QAKFgvNCyFJjUR1Am/S5OJpt6NFJK12GZXgwGYGWoPXyuo6mdvLgBeY6LXcggRpgRM2jH1LhtBKKinSWEUAW3+Sep7k4+U8OrCKZXVVemxf8AeJFVDGkgTJIKkA6QV2JiNWDeD+Lq9HMqlaPJqpyksv7sydM7QhFvn7CkJJaJuEqPqZNpPT2I/njO8b8S5fLr+9qD/Sm7H2A3/u+K8n4ty9YEeYhIYrYGCRvA6+0b9JxhuJZHJee7eXTVS0866CTJmBIn6i/vMhpZFEMcUmMP8WqVW896arTcwJJ1kwbx0S0fJnBHn0mtp/PGe4rxFnqO681IhRFNTqVR0Uxyj6Rew2xPMZiShpMrI4B1NP2YEiCLWF5PuBhX8qXgMPhY0m5U/wBsuK5o1PL8mkKLQWqirNh0Ksmr3gRP4hfHvFuErqoUxVpjzSKYRkILvc65DQL97CQJviGTr130KyBWtIBYyT+ERMdb3wy4hws0KlKrUprUdLq7H09TpW8kWn6X7JJxdyZ0YrHUYIF8K+HnWqaj02BSVUaepJ1M0WPbc3m9hjuO1mLpSbSysGIJA0yAZMyNl5oJ6byLtsn4mqiqfMDtpsDygMdiOkgXO/bANPPUcxW1pTeu6g6C2tkLAkQdg15iLje43iuLd+izk0q9ivM1qmrTTqALJLLTusyRAIMzsYHx8xzNCmq0sxrZqbN5b6VOqQWBUEGSQgJHYxvhpxHh9SoSpoCiQ0lablluJmIWNvUCZk2JGEtbJrTMuASLFZLqWtubQQARcAiVPWcNL+YYJvwW5jPCg1KmKhaiZZdbOHpMSTK6TrZGXTIvJHe2Heby9J8sldjTRlXUlR3ZiylpDEhdQOoEfw9ZHTAy0WrZZVDEIwJY1FcoArL1F/YgkWG8CzzOZyvTWiaDUxqUJTp6JXSB6WXcgwWGzcvQTikGmrJzTToinDsw9EVagpuIZyq6mJG4ZQUVr/h0yfecWvk2pU1d10JcARpiO4tpsOwwTSq5rMUgK1ZBIKulKkwkG3rLNpPtH16jO0DXQ+WaOaqJROkVGqqyD5Y1S0dJ0zEWi2Hko1oSLl5HaH5I+388WIJxFaK2YETfpt3+/wA9sSaowN01JHRoYH4IgiPriVlKthGVyzMCZWxiCYOOdCpi2ODUzOmojQNiYb8wJxclKjEmoVI7ow/Pr84K2CmikHEhjgvYz7/7G+PSvbHAIsMeFMWY8PtggPkHFuFVeVmYUQSVWNWkz0kCC3sT+mNQfFopUqdBKS0/KAVYJWQJBUhlIJ6zMn5OBM7xzza3kK6UBMsWuTAJ2MqsmLXMXxOl+z1QaTQq3mqihYtM7RM2uOo6YnCcuP2QrUb+oVmvEeYrgCrXp06IcStOm0vuYLeZtEDaJx5xrijCmSupaiS6NTXVTIGwt6gYMhh2thJl3oUKrLSJZSwBMg2UEA2Am94MgT1wTnkWsNdNTTFMGowqFTTJEwI3kkaZX69sG9gcLRKlm8vVpLUrhA4JgUkY6eYxYao2JliNxffFPhgtXrDzZ8lVk6ii6gLCDq9hIBMAD5xfwVfMqrTpUxUIUN5lMfuUkkaSUAIgiSJja2IGmfPXKlHl2XWoBhdR0hyvaJM2Fr3wVa8AtrTJ+JM5QRS+VdqY1Q9IqHmxPIVYML6vU2+0WxM5OrmKKVqdIVlqHSNegoHEhgQ3+XeR7xv0xq+M8I4fQpCpXRWTlEMoJYxYKFEu25gzF9sU5/PqtFVVE0DTFGkVJQSdMj02bcCbz846Dcm2hpySSBMt4Bq1KLLWdBX/AICpJAXqCYFyBFtoG+MvmuDVcsXpIFcqRZuXUxj09CZNxJPb21TeNatJQroiusQDrkbAagqkAn56/a7zalQajQpPUeSNRYC5IAPpAWxNyelp3eUVWi+P5M4tv/gy/BshXjzQoWorBgiHpe5lhBDAG5jbvGGWfyFWuqVnpVCbFmLMQd9UWsFE7W97E41vA+GU1eWZC4BDKitAIIMAzeNpN8DeLKZCq1FmDEqo0SwJJuCsaVb/AFOcTUdWCWeUn/6J8nWolIp0gq6olmhDcMfkSJv3P0eZfKZRgtVvLRVLKWDmVsWncaeaZ76jO9s/ka+hXI1CHp80hpC81RAASvMr6ReDAOKclmqRzFSklKnFVlUc+kIoLG4Gzm5uIlbA4KTjTIYJc248rHPFeMKzGlRYv5oclaRhgJ0gxYgMTH0mL494dwI5pVpVK2iqikVDp1FwSQLndgukEhvptC3/ANMVydFJkKgzDMQCbqU6yRpMHbrbYDUqDJpIfTDMHpywYbidW14+xEYSUmn9ka+KS+rDeLeG6mVABqVGLMApRPWY9IALdibkdegOLcjwLM02b9nRGpqDFNivm3F50gIZM+9/pgSrxJ6xktXQABQwZWABtBCksDqsfpPYe0SUV0FU621AyDrkyGIJgjTGox07kDCpxfgaUeUVyeyNTN+fq1q6FSRCkjTF9N+xJsdsM+E+GVdaLUopqpJZWBYuCe5IIjpa8D5wq4flApCu7ElGZOjTe8GwETYkTB64f0aTBAKNYA7NABqOR2aYn1C30wkKUvv0xpuo/Tsy3iPhmby1ZFe1LW3lOrNpMySHuAthuwi2DKWd/aMvp8xE06l0qJMBYgEkSbmxJF9onDTNpUzVNEXNqiFzIq0lZm/0q0gBRB9z33xlM1xA0ahph2qlQGIqRImGEaBqO4/vfT9Itq6M95J1ST9tuh7wXhVCiQ2X/ckGXVURvNX6EQAbXjeR2w7ObQsQUoibgmNVp3UdvZv1xl+DceZoFaiaYglahUqtvdh1++GS5tSCyslSDIABJH/lMD522wvMLx0G1Fc81MgjtNu4+/aQPzm2jnAxA5j9CBPsbauu07YVCsS+pSYVogkqsxuARcX3BI+0YNo5iorBKhVtZ5baY7r1FT/+evbCnMbKp/5/5xYEE7RihWkgSABY2N+2PWB+R98MIFCmPjHFcCeYQR0J6f7/AMsRVztJPv1/kDg2AKPbr1g/3fHsf3b+uKBW+Ov1+JM/TEzU/ucdZx87zPl5tRnsotZK9Eg1h5ZqFgVNgAZIMEEyd5N8MPDtVc4W8yhmEdFsuioqlbiVIAHcQb9pxHh/hGtUbpSKm5UNJ3tNp7cpjr86FvEFCgPJQLUKepKJlVaQIYiSWPWb98FqMtvROEmlSFtfwUtZdemqDzaQ9j8Ek6ipN7jvAvJRI1KjqoOq1BTckeVdSZKwxMltJE6SI6m1i2zHHc/UVwtNaaMSLJ+8Ag9CTeet/icFZfJ+VTV3ywZ7sxUhisyZI/FBJkXgj2wLi+g8Wrb8hNWrnMqwKZemyWnVVVWBvbSqwdxEkdsdxTitYUCdK0MwWhQ+pg206fxH8rYhmvEFJQu9RyQA2wAtsP4TuO9vjCLLZjMVKlSqHpSrldTIWe02XqALbCJ+uDkna+oqg1/E6DKGZbQ+pqt5harawWEkFQ3pJg7WuIJ6crEMWRRTV45TUXUTAM6V2Ezt1GI5rLIlMVKpWrUYiD5jMEPUwto39XXvhbSKj1lgGkpNMqsTHL/pJgbiYJ98YeD8mzFOMet/zHf7XWJ0ghiobQ7RoOqOsE2k7C4xDzQpp+aKmoMCQCCoXaT26CJ6/dbVd6VRWJlIEAHml73AvsDYxEEnfFiatJKcw3aLCbkE9oPS4g9MNG4FFPk3av8AsNs+C4RwSgfmBQkFCLA2O1/cfO+J0ONVqiaa4YMvLVQQdQuDVon+KBzFRcQbCMLOJZyoir5ykKyhQUVWWQOUHSCRaBBB67bYXNnhCgHeNJNipFhF7EdOxE9cVjNxfWgZILLGm9oPzmQbzHJMLUDCx/dqVKi4YeryyFVhHpbffAnFK6vUNIKtLQ5hk9QIBPMdRgSC3zPW4K8R+J2rfuvL8ylqBEjS9hFtLQvr332mYIAa8KIJYaFWqP3bMWcIBBaJjWd1HSxv0xST1oj8bDCFezScJqU1VdS6qtUKxmWIBAEX9I+TEtAnow49wp9GqpNKiu6oyqoFyWblLNHt9rThXkDTWnTFJSLo1UcxAZLG9ywC2+3U42eYreZpUiNXdTBnp/scN+NUl/cu+VJyVXej5nXby0BRiabOagb1I2yiOx0gkyARpi4tinLZ5NSo1MR1dWvboYG1zFsO+L+D2pUiKBd5cMKZAOkGZgm/a36zOMrTcAXYhklYAAI3UqR+IX+sfOJ8HH+IbT6NHlCoJfVUVIm8c3qJFlvfVsBIAAtOLauYcVXeiquqKpCkR5hAlgp9SkdoI3tbC7L1QMqaj1QG1BFpKFmAJliLqoa0QCN7yMW5GtTQsza1RqulAhVbEuQDIJJUQN5PS5wrj7F5eh9wXiZqeXWq5alTFNgVcnRpU/iNwxv1i4m22L+KcbyFZgYpiobaydDRcWIN/aZxn8vUpswFNq61vNlaYYAMYCySCQQZNiRqI2jDDN5tqZTL5+S7ltJYImqPw1FIEhe2mfyw0skkurQlRc76f60V8LymYAfzEDLPqVhUAF4PcdOm0YPogFx5CM4IlyCo07fCk/P0wFX4oMrRStlmqInmLKWcONiFDbb7gjYna+Dqfi1HK6pGsSom5ME6SAZkrJB6xthFJeDpqTZOjQLT5hZRqbTOnVubnTIgiIFj0ODVpBeUCBf5+QSfrcHCs8eViGblpoLl9OokgczRYGPpfB9KqXKsvMoJg6rEXhoi87QSP6214JOLXZOslpA5vcx+cYqXvb3O/v8Ae+L0pxdTEgdyLdhNsdo7gT1g44U6xt0O8H+mPHXsOneB+hvinSNgNvkfbE0e8QY6E2FzHff+owVs5kKpG8WBE2P6/wA9sWsB+Ix0xC5JFwRbaB8jEC0eoT2kT/LHMBjs/wAFzTmKrtpfqaqwx7aNclYJtFsSynDgJShNSsg5mSwXYzH8R6SIAkYU8KYVqgFVmMlQKck7m7FtUkARaFMsLi+G3jKiaGbNahU0MwGpbnpIJAIaWkiNzbuMBr2Tt+OyPE2rZWGrKR7lCC0kkgtJDEjebTe0Ri7MKalw00nK6CscxsVBgbSCCbx23iziXEs0tBWzJLlvQSoBAIB9jcSLi07nceZVSAlAKo1HSg1aYAAk36DckDt1Ix0cXKWul5ZSc3jSUu34KsplvMclCIlVBiAg1SeWACSJtA398TGbprSrUkL+oMeVULEMQQd9I6WvaJx5nMoFHk0yQiQpIclSeuwEAEgXnY+2F9MaZRi3lqIlXAvJ36wTFvcGJOIuT2jla3LZa1dWsLItiIBvMkC8dBf6z3hmaVRwCi8wPoZjq36WgCfbbvgqpw8EySpVQIUHlustu0SYHtbEMyKjMrQopgrzA8zzBiOsn3sb9LInXRTna0RauFqeVI1gQNIAgqgOk7XJtEfUbYhSzKEkNppmTqLDS3UgWmTp2Xaw2tgbiVY6ajpLVACSbCbjUEixCzuBJMRIE4LyyVKupWMhVBhoYHrpYEDdZ5va+DSSsMcjK6GcKyhZtF9IcGQN53Mnf03m0XtZXMSVYaWuhMR3v/CObaT9rnGkp+Gafl0QQp1sGcrTCsIDSpaYAJgRpN47Yy7IzpVZCClNoYsYuZvbrymWm/tOGVSf1HUtOwbidB3papUmYOkTIv1BA6D4nYjYsuwdE1MzUyR8t+cLKzcxv3MpP2PMVKgy9OWNRZ0ghQAWgsIAiN5+Y3vq/wD0+KFRJq+ZVamBUsBEESQdxPb/AIFIQuSizT8KUfydDbgNUQpIHMYW3S946zBP1GNZlT5kFtl2vH3jGVCaXSI5Zge8AY0mTrgwuwj+/wC/jG+qH+UrfJBmYpgrIFh7yf1nAOa4BSzCg1VVpFmjmHYzv2tseuGFHLIRO8Wm4/XFSQDouNIsZv8AXv0xKbpGJXVI+U8TFXK1osHQxdQVdSCJ0k3Gw9j8YrNZ0GsAqKzMYCgaSOgJkAE2HW0jG/41kxmVfUvIRIqWsRYwPoJHXHziotSi70XIItF7XuGjtf2kG8dM8tx+vRVxrZLM1FYrUAOpXkBKgmDNut7b9SPcw+z/ABRq1KcxmKZptUADAj92xBAPLcmdzeAfbCQV1Cejy9Kr6SWUkATJXZSwOwsWi4k4MTUjTTRalN1hlXTpad+oBIgEEXtib5R0TcU3fkPqcIWm4ZmJpqpcHWvOQLEMBI1gzAJXk+zSnlsnVyy1aq+aunXqEGpDMLwRMDlMyehN5OEy5dGpimnOiuo0gmUMyQCpiDcH5N7zih65fTWpBgyFT6Rz0ybgKZG0AzuJwcSjtydCZeektjPh3B6WX1VKWrQzSfN1FjsJbmAIj8U2Bw+yvEaVGkfOJgFioAkkHm5fiSLmABvjN8P4q1NuTcQug0nJWZmytdu5lo6XwY9M5llqOusrqQ06hkBhewBAtEhmDeo2nC83YXFeQ/I8dy9emWpZhabqZC1oBtewW1Qf9v364ZUOI5jMD00XQSCYJMyLqSwgafY3jfGYr+GqT6S1O47nf56EfIw6o6qVqQhYAZVIT6rykC3YCYFxh1NiOKCGyBhuVvccwP8AfSRgFMt5d1kA3I1sQT9ft0kRjzNZc1mJqs4RSpVWYkWMyeYmZ7EbDfBwaf0NyCP7/PDA7K6dXVJsRHSfy/LFSou7C567T+m22JrQXptP9x2x4KJBPpYdJAkd+/zsPrjrvsWvQj4rVoUrUVXV6vLVVtffaxn64S8T4ualRNA8tqiwSqk1CzerSRcEbW3v0wXw6t5tIs7CDI0nSV6j3Bvf6j6KMlRFDzdFVaW41AnUReQWuyIYPpF4E98Fx02loCYyHDyVX9oZhVSCVcjrygEKbE9zPWNraKhlqNamimnIEDWfV3sb6RN5tFgN4xmOD0Ep5dhz66hZ/MLhjqEovMVXlEEgQeuNBX4mlJKFOo7GrotSo7tIBPSAu8GQDe9sZ129lpTvbI8V4U6uTTVEXRphZ0+5Mm7RAB9++EmsKkJcNIae9zy3gqYgm8fXGr4ln4ozUlR6eUKSR+GWmTa+mdt8YykEq6iqCvym7OOm07WJXa+x+MM2myb5NUE0XVgq1KnKC4Xpci8mwAMxEgzIBPSxszKCXEGyMtr3gAC0EGN4Nr4oy+VL0aZRqdVkfW4GliILHS0iQS0gKPYzaMF1s4auqotHStQQUiBGkoZLLAJJmwuAMTaJSk0yimgei50rqJurKQsxuvUMd5m09rY94RnyqCgBoCm6mJIA0nS+5j36374tNEqV0fvVp69diIJ06Wn03EG++m03wFmaMnzADqVQqx0YEyANzJkdiZw0d6GjJNOjS8V8QfuWdAwqE+mLICObeZJIO0gmNsJqFVRkamoLLEVBZZM2IY9oBbr6lxRw/PhQArU4a6hjzA3I0z/DE2+PjGi4TwuiaVPzKLG61deoCDYg2MkbcpHQH3xo+PLjJ0v8/wAsbLCMoJmRXiuYo5dXXXResyguywxSC0KxFoAGw6gW3wV4ceDqkuzk3LSWMwZJPt19sbmjkVq028xNSbBTPMAbN3G9r7YzWVygRiEp1DTBYghekzAnuT+m+LY8VStHo/AzRqUWv9/+h0cuXcEdN5/T3i35YMCOi2iZ/vfA2XzLgKFytR9gWZoPyf8AbB1DNpUCjQQxnZrCPf8AlGLPkNLIW5TibhlUjl7xfoJ7YlxLP6HUC7H+W8/p9cZ3NZ96alupkKPef5C+DMrmDUIp1RpYwQ0zEif9sCrG/Cr5Vo941ndJ00ypUgsVJ21Emb7G5E74S8QGpqZKNy6VfQpZtJLEcoBJEdupwyz9ZEYedEUlJNSYUgGRfsLn64QcO8QVK9SpmFWKMNpcidoIMW3IFrGO0YWUYxhSHk4RxqNbKM29DWaNCk5qCArMnLqn3u3LY2gm4kRgBqbsWp1KMEMVOpCVU26RCsRpNoO31+h+FMzSamrrdj6dQEqDEAdRAIBEkiR3wi8S8Y1sdDLTpImp6oV3JqXEWBIGlrmLAXKxjzrcpaR5/NRdPoS8Oy1NaiMq1KRBAZQwOqQCCgvqNhYRMsRu0bevlUcU1Xyg8TrVJYiBfcWLXMzPab4VcA4LTahTqVClU8xDqZIJnXpO6tvImCZxKjxFASHPJqCs6seQ9CwGyMeuwv2MVcX5J87ejl4FXquy1CgoIZDTDNbaJNpJFyO4G2GqUlonWpJtLF4ljAk7Dmgb9fywSMgtySzH3bFXEMwUVmZSwiwAufaZ/ljnji48WhXNt3Ysr5ipVQ/sxRXVoYsCQoPUAHqLqbgwR8MneNiNjYtE7SZubfzwJR4P5dKnVps5DUwraTqC7EAW1OokgG/0woz1FKpDp53LqADlyvQ7MeUExAgdDfBknF00C1LZoqNRHnSwYAlTBmCNwexxIi0gxPUHC6jWrlZIgmDYD6yAZ1R0BjbbE3Y6pGv3BiDAnlJIHfb8gCMccdmy4jSSsG+nTfpB1C4uTMgyB0xyZ6QJU/SPz98LH42pKlk5YJYaSGUdGA2cARMfIkYKRqTogRdGkXEou/S8iB0g4Ry8DqOrKR4dp06ctKxJCyYXey3mIMfzxXU4ZRegIoUwVBE7MV7WMxqnruPnGg4xmaapJamq7szwFHySfyB+mMrxLxEmn/2yK1o8xgdFuumzEe8r9cGWRyjUHd+dV/YxQUlK14EFHNvWNNklVUcqEATcwZNyd5kiL40XD6uSy0qHR6zLcK9vjVMKo7CSO3TGX4iWzCuqMFV/VUIMQZnSBc2kXtc3wmCIq+XT9IN3a8fA6tH0B79XWL2VeT0aDxLm6zyKuZVUUFglJfQO5JY6oA6iN7DE9NOklRo0lNKugiYbQAQANzJa28DYmMU18xQqgUKNPzmK7czVIuTN733ggffHuXpPTIdlcVCpEmCUCdCpvIjeT0GFlXHofHd7L/D2YqUmrLrJeoAFLrF1AgETY6dRMwdpAm7CtRqIUy5hZAMqOUGB6p9XKCAOl/YYCzNIoi+YJBWG1apLMDaexIEnr9cNKyIxWQq+Wygk2LAkCB3m0LA/lib2xGnyp9ADgMxTywuqQukzBkkb2vO0e2Bs0zajJLTDMsLaCZ3IgFiZmQuok7HFnE6tMzYBp5ZEBgZt3JF/1+KuC16L1QVQgjSRA0sBax3kTa5+Ix0Vx2dGHDplVBJzdBQrSebVdbGWMArzAgEX7R0xr6Wcq+bpqor0yQDUHJF4goSdXyLewiMQ4jl9VZK8elWWdYJkaYt0tqv74Ezek2Leqe9v5e+2KSnwlovCHONs29cfuwiyLxPSP+MLK3mpTACpZSYU7QbAAEAkie3TGKfiOaZqnmMHUQJ0xHT4vt9D0xFAzABk1KfePsBbGvHlUjX8b4v0u/JtcjnHjUxQWZoB+Y3vMR98Jc54hJUUqHMyiJBJUR2n7bYzzZRUbmQR7Tb/AGxfks4tMFVAW+/Uj5xoUb7Nsfi75djng9Viee7GdMbLO8e9secYpRSVjd1Omb3g9duxxDhefUWH8OJZ6qKrBdWkTMdTHQdu84LiNTWS60V8Y4RWzwpeXVKMhDEgbEbECR6TB+e1sE8PpftFDMUSwpZmkXGYXSFpvDHTVTpMAMQO5B6HGo8MV8u1I6mXXN+YAiTCjcRJ+5OEXjHwzQGp6ZAqOQCHgi4idpgACe+2Mkm03I8vPNTyV0YrJ0dCmoXamg0gpGpQy6TYkHTytv1H0xs6dR81qE00am4PMAwKsDIYRcg9COnvOMnUyaFnFLWz7aRvUjTeQCAYBMxaRhiwq1BUNEuuuGtpABCEEyImDzke9u2MvJ9oSUY00aPh+Tp09Zy2jyTJdAWIBAuRJIXYcogb++EPFsjRlqtR2hy8GkrHe4CgAk9Cdha+CeHqA66ahBAGu8eYRAkqCBqO5Ii/Q3k3NZZHOqDSUAkaCIJuCSdNu8e04dxl5JprwKuC8eqZcBNDVsvAjSGL0zElbDYT6WgrO8DBed8aUzytl6gPRXIB7bKWIHyBjzI5kCVCJzgsHWiCRflFTUDqETMEGx72Lzlag7BvJRT+JWKjV/27fJ9r7YDkl2wqPLpFOXzFWpTikGpAOGFKpq0MAZIkX0n2N+owxqiblil9WkEQN7f6lN7H+QwMc41NNVQgxcwCAQBJidiRgh6jMCFhDvuJE/ItI9jgc1IDg4nMq0w9RELEqLKILRtYwAfn27YS8U4nm1cU6NKmyVdPLUEMk+rVBgr3Pcm5w8oirMMVdTsy2j5H8wemwwj49K1lcqWUqyx6hIvEBQZYCYv6bb4576Ai+hoq0whpKlQROlYWfxKQJ0ah6oAOBs74UoV4aDSiZAWnMzeSUJO1r/bEUy1TMMj3QER5lNmSVGw0hzF/rjSBQerff+uAhnaM3lcuqgNVdsw5AlmBEWvY3AnYAAe2BMzmtSMqmFG+5Hb4P54Bztao4JiRMAahJ+FnY2hiSDgvLKiuHrE0lWbGTG/QC5Pt8Y0NxhH6I8+OOpcpBL5c5nKU6IQUFD63DMC9QQRzaRA5469O2M5QyjFpdbiRDzaCRtNjI3w/4t4kZ1jK02JJChmUA/adKjrLavgYT1Gcc1Vhex35mPQELC/8YzKUq3/TyaIpt78k+B+IFyVeolOjqdkl2kWE7bSeh3A23w04XXptqeTDNJkTOp7rEcsyBvYTthTkkkahppzUkaB11W92sIB+tsMs3T10FeKashayEgHm63MmATuQSCJ7lu1xKOb5bQH4lrqxVCOTzA4UzNps0fwQR223wDTrlWJ5o1BgqkqAYgAC4F5b3k9hDrMZKGDECWAsZ6jobgbfMTfFRouCrlIgkPAPpvBgSbAj6+1sBPVMPFt2B5PLtXYgIWqG2hiV03Bna4P/AADJIn4cyx/aaupQNBIJmQDJ67kdR1wz4KwptKEnSsanW5JvbqBMQPb3wY9NVZ3DcrsGJ0BYhQDadrT8k45uLhXk5Qbe+gfMcRKF2QyBy2uNRjp3A7e2KuJV6NKBVc6iLKBzsDcWUXt+uAOJZVWRijR5bqSs2i/Mvza57HfD/h3EMtmKZQjS4plP3gAjlgGb/P8AzhWopWdhvaQnytY1TVZaYUKm7HU3UiQOtid5wFQz/ICAT26N9Y2Jwz4hwerk6X7uurFiD5aaWMRvzXMxG49oxnBmNemmv+aw1EKCukxJEH1R84tjcoy0bcPyFj2zT5fKKTBU1D11EmPeNowRTylAn97TVQNmgD2IAEE4RftFWowDWUdFNjET0Hvi7KZMgtJ+Ln+/rj1IpNWj1klKN3Q/zhpImnLkER8b9yd/+cBZCiWqaZ9UAWgfGKM0AqgEzJtc9I/KT+nvh3T8PpKBqkuJaoNgOUi3dpiD07Yhmy8F+yOTKscavYFn+FGhDVahenMtq2WLjcwt9iAMT4zxFKwBCjSQZcgFhUEWaTy2gRvBnbDniHGaFKgKcis+lZFm2ImZsTI2wGnDKYpqioFNRwwVQF5jeTPXeZx505SlK27Z5KpIz1SgBVCs2hwJAJIYD40ix6AzN+3Mw4bnKihaIRaj2KE8hOrmIXSDBi4QgW2PQLeMGombqjyqjaWSYJIViqz0+QJPUQIjG24Nwk5dUr1m012IVaYIOmRAUmLtBJLbAWvuXjGT/RJyVe2KK/BK8s4ouBudXLHU3PTC3ivEMwqlDlagEBzqYjWuoAhCs6eWTJj4vOPqNHNlkYmTCltIFzvAHuSD9se5bOgqjqsq8mQbi03HebfTGpxT0ZlJrZ8h4fxeoa5qvS8uhSADllmpoa3mTJsradQiynVJEwwFBkd0FVazczU5ZYIbmggCCV6EbgdMe+N1zX7c+ZoVgmlAiU1BYvp1EsygRp1MU5rsBAwkq0MpVpinWp1KCmoHUo58tTBEDzFBoqpLkLsJMHYCEuL8lo8k7Q94ow8s0qjlRyhDYBibBSZ67W74MTJrT0lRVYmFGlmYLAsCCdukwdsAHIjSFVnr04FylMyBYFWFQERP1v3nDPIPygSzNEFmUrqi17kauhM/riKKNspq8Zy2oU3GmLiQQvaZ9Ig+9rYNqBHgHQwNwbHbYjvHce2F+a0+alkLKSZYwygjpY2PU9sevl01akKqTzKQYBM+xhp9x16YYWgrM8SCEK0838QEqOsG8i1+sC/Q4IlXg6jEAgqzAGfdTzfOBvNknVTEkbiDP0idsWBtVwZHsf6bYByFmc4uFqlUUNmKjAgGRJMKpZuwAUWvbpvinL8E16mzVU13vKLyU1A6TE9YOlfr1x2Oxpht0yDiuKBc7nqbutKjTWmFuWC3I6XJLEHsb2He1JzShgh6QTI2PQ9ZMR8Y7HYjl/jY+T6N0eZVRdEUMokCTA/Q/wBziys7x/lqV0kMA195tIA3/rjzHYRNxdodO48SOSzdSmtOsyB6DKSEc6gYJGx2M+0e2LF4qVbnTVTZuVBAZZuACLR0veOuPcdj3cmLHLC8jiro8+GSSyKN6sJpUonVALEmF2G36bYozQkmZgdAesSd+kEY9x2PnqPVkynNE6Af4AIVltYlhDjckaWgjYHA6ZFyqsUANwCr7jsdVxe4vbtjsdhZfVaKYFzk7IV8vUblqN5dRgToF1tFx+W/xBGAnySuZa2gNzj8Nwf9R29/547HYfHJ7OzQWgepVq0kpVR/lGAJPZyrLpHQ9/fGj4BnUJZ1AuhEEd739ot747HY3fHyNviX+H/o8VYl43UNU+ctRkWlGkrPM4IbaRAtue3XFPFuL1azliwldOpXLnUIvEWJ39VhuATjsdiDk5Nt+zNlk3IYFaSgqoOqJD0+Vl62uN+4j4w2yfjGnRGqtTqtVMqXGg0wJNoJBFjzELJi0gDHY7CQ2TzLVDfNeMKIAGVJZ3iXKbFYY6iwlyR7fWcWeIOM08zlUrITrLaLSNwZIMT/AAkj/t9wcdjsO9/XwJjioxUl2BcIzwpa/wBoq1FKlufUSWD2mQrHctYjqNumjZf8OoVSHPlTKBizFXdgoBNyU1sOlh3x2Ow+N/V/onk7j+0ZR4y/7uXrOGHnvPMTBhRqItsZ+N8VVeK0WQpFSmbAagGA2A1AGSPg47HYxxjauzVe6J5TMpyqFKhg0MhhSRclbBlNpuO+84PVwwJEsFi8mYIBUgm+3e9vYY7HYsloST2esCekm8ExI+PkHFGkFuoYNAaTYxMb7flcY7HYApPnBJ1SNwDuPrBkW/uZxSaBaCLSJOmNzfr847HY4J//2Q=='
    }
  ];
 
  const getPermmisiion = async () => {
    const {hasPermission, requestPermission} = useCameraPermission();
    if (!hasPermission) {
      return (
        <View
          style={{
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              color: CustomStyle.primary,
            }}>
            Camera permission is required
          </Text>
          <Pressable
            onPress={() => requestPermission()}
            style={{
              padding: 10,
              margin: 20,
              backgroundColor: CustomStyle.primary,
            }}>
            <Text style={{}}>Enable Camera Access</Text>
          </Pressable>
        </View>
      );
    }
  };
 
   useEffect(()=>{
      getPermmisiion()
   },[])
  return (
    <ScrollView>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          padding: 10,
        }}>
        Report a Hazard
      </Text>

      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 10,
        }}>
        <Image
          source={{
            uri: 'https://images.squarespace-cdn.com/content/v1/573365789f726693272dc91a/1704992146415-CI272VYXPALWT52IGLUB/AdobeStock_201419293.jpeg?format=1500w',
          }}
          style={{
            height: 150,
            width: 150,
            borderRadius: 100,
            borderWidth: 2,
            borderColor: CustomStyle.primary,
          }}
        />
        <Text
          style={{
            padding: 20,
            fontSize: 20,
            fontWeight: 'bold',
            color: CustomStyle.primary,         
            borderRadius: 20,
          }}>
          Find any hazard in your area?
        </Text>
        <Text>Report Now</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
        {hazards.map((hazard, index) => (
          <TouchableOpacity
          onPress={()=>{
             navigation.navigate('AddReport', {hazard: hazard.name})
          }}
            key={index}
            style={{
              width: 150,
              borderRadius: 10,
              margin: 10,
              borderWidth: 1,
              borderColor: CustomStyle.primary,
            }}>
            <Image
              source={{uri: hazard.img }}
              style={{
                height: 150,
                width: 150,
              }}
            />
            <Text
              style={{
                backgroundColor: CustomStyle.primary,
                color: 'white',
                textAlign: 'center',
                padding: 5,
                fontWeight: 'bold',
              }}>
              {hazard.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View
        style={{
          height: 100,
        }}></View>
    </ScrollView>
  );
};

export default Report;

const styles = StyleSheet.create({});
