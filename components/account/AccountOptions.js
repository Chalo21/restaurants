import React, { useState } from 'react'
import { map } from 'lodash';
import { StyleSheet, Text, View } from 'react-native'
import { Icon, ListItem } from 'react-native-elements';
import Modal from '../Modal';

export default function AccountOptions({user, toastRef}) {
    const menuOptions = generateOptions();

    const [showModal, setShowModal] = useState(true)
    
    return (
        <View>
            {
                map(menuOptions, (menu, index) => (
                    <ListItem
                        key={index}
                        style={styles.menuItem}
                        onPress={menu.onPress}
                        >
                       <Icon
                            type="material-community"
                            name={menu.iconNameLeft}
                            color={menu.iconColorLeft}
                            /> 
                       <ListItem.Content>
                           <ListItem.Title>
                               {menu.title}
                           </ListItem.Title>
                       </ListItem.Content>
                       <Icon
                            type="material-community"
                            name={menu.iconNameRight}
                            color={menu.iconColorRight}
                            /> 
                    </ListItem>
                ))
            }
            <Modal isVisible={showModal} setVisible={setShowModal}>
                <Text>Oeeeeeeeeee LM</Text>
            </Modal>
        </View>
    )
}

const generateOptions = () => {
    return [
        {
            title: "Cambiar Nombres y Apellidos", 
            iconNameLeft: "account-circle",
            iconColorLeft: "#0b7b83",
            iconNameRight: "chevron-right",
            iconColorRight: "#0b7b83",
            onPress: () => selectedComponet("displayName")
        },
        {
            title: "Cambiar Email", 
            iconNameLeft: "at",
            iconColorLeft: "#0b7b83",
            iconNameRight: "chevron-right",
            iconColorRight: "#0b7b83",
            onPress: () => selectedComponet("email")
        },
        {
            title: "Cambiar Contraseña", 
            iconNameLeft: "lock-reset",
            iconColorLeft: "#0b7b83",
            iconNameRight: "chevron-right",
            iconColorRight: "#0b7b83",
            onPress: () => selectedComponet("password")
        }
    ]
}

const selectedComponet = (key) => {
    console.log(key)
}

const styles = StyleSheet.create({
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#6d1a1a"
    }
})
