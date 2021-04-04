import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'

export default function ChangeDisplayNameForm({displayname, setShowModal, toastRef}) {
    return (
        <View style={styles.view}>
            <Input
                placeholder="Ingrese nombres y apellidos"
                containerStyle={styles.input}
                defaultValue={displayname}
                rightIcon={{
                    type: "material-community",
                    name: "account-circle-outline",
                    color: "#629371"
                }}
            />
            <Button
                title="Cambiar Nombres y Apellidos"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingVertical: 10
    },
    input: {
        marginBottom: 10
    },
    btnContainer: {
        width: "95%"
    },
    btn: {
        backgroundColor: "#6d1a1a"
    }
})
