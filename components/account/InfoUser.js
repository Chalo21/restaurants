import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements'

export default function InfoUser({ user }) {
    console.log(user)
    return (
        <View style={styles.continer}>
            <Avatar 
                rounded
                size="large"
                source={
                    user.photoURL 
                        ? { url:photoURL }
                        : require("../../assets/avatar-default.jpg")
                }
            />
            <View style={styles.infoUser}>
                <Text style={styles.displayName}>
                    {
                        user.displayName ? user.displayName : "Anónimo" 
                    }
                </Text>
                <Text>{user.email}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    continer : {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#f9f9f9",
        paddingVertical: 30
    },

    infoUser : {
        marginLeft: 20
    },

    displayName : {
        fontWeight: "bold",
        paddingBottom: 5
    }
})
