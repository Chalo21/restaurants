import React,{ useState, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AirbnbRating, Button, Input } from 'react-native-elements'
import Toast from 'react-native-easy-toast'

export default function AddReviewRestaurant({ navigation, route}) {
    const { idRestaurant } = route.params
    const toastRef = useRef()

    const [rating, setRating] = useState(null)
    const [title, setTitle] = useState("")
    const [errorTitle, setErrorTitle] = useState(null)
    const [review, setReview] = useState("")
    const [errorReview, setErrorReview] = useState(null)
    const [loading, setLoading] = useState(false)

    return (
        <View style={styles.viewBody}>
            <View style={styles.viewRating}>
                <AirbnbRating
                    count={5}
                    reviews={["Malo","Regular","Normal", "Muy Bueno", "Excelente"]}
                    defaultRating={0}
                    size={35}
                />
            </View>
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
    }
})
