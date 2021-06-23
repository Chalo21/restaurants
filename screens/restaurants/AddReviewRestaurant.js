import React,{ useState, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AirbnbRating, Button, Input } from 'react-native-elements'
import { isEmpty } from 'lodash'
import Toast from 'react-native-easy-toast'

import Loading from "../../components/Loading"

export default function AddReviewRestaurant({ navigation, route}) {
    const { idRestaurant } = route.params
    const toastRef = useRef()

    const [rating, setRating] = useState(null)
    const [title, setTitle] = useState("")
    const [errorTitle, setErrorTitle] = useState(null)
    const [review, setReview] = useState("")
    const [errorReview, setErrorReview] = useState(null)
    const [loading, setLoading] = useState(false)

    const addReview = () => {
        if(!validForm()) {
            return
        }
    }

    const validForm = () => {
        setErrorTitle(null)
        setErrorReview(null)
        let isValid = true

        if(!rating) {
            toastRef.current.show("Debes darle una puntuación al restaurante.", 3000)
            isValid= false
        }

        if(isEmpty(title)){
            setErrorTitle("Debes ingresar un titulo a tu comentario.", 3000)
            isValid = false
        }

        if(isEmpty(review)){
            setErrorReview("Debes ingresar un comentario.", 3000)
            isValid = false
        }

        return isValid
    }

    return (
        <View style={styles.viewBody}>
            <View style={styles.viewRating}>
                <AirbnbRating
                    count={5}
                    reviews={["Malo","Regular","Normal", "Muy Bueno", "Excelente"]}
                    defaultRating={0}
                    size={35}
                    onFinishRating={(value) => setRating(value)}
                />
            </View>
            <View style={styles.formReview}>
                <Input
                    placeholder="Titulo..."
                    containerStyle={styles.input}
                    onChange={(e) => setTitle(e.nativeEvent.text)}
                    errorMessage={errorTitle}
                />
                <Input
                    placeholder="Comentario..."
                    containerStyle={styles.input}
                    style={styles.textArea}
                    multiline
                    onChange={(e) => setReview(e.nativeEvent.text)}
                    errorMessage={errorReview}
                />
                <Button
                    title="Enviar Comentario"
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.btn}
                    onPress={addReview}
                />
            </View>
            <Toast ref={toastRef} position="center" opacity={0.9}/>
            <Loading isVisible={loading} text={"Enviando comentario"}/>
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody : {
        flex: 1
    },
    viewRating : {
        height: 120,
        backgroundColor: "#f2f2f2"
    },
    formReview : {
        flex: 1,
        alignItems: "center",
        margin: 10,
        marginTop: 40
    },
    input : {
        marginBottom: 10
    },
    textArea : {
        height: 150,
        width: "100%",
        padding: 0,
        margin: 0
    },
    btnContainer : {
        flex: 1,
        justifyContent: "flex-end",
        marginTop: 20,
        marginBottom: 10,
        width: "100%"
    },
    btn : {
        backgroundColor: "#6d1a1a"
    }
})
