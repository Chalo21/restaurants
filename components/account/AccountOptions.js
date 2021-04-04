import React, { useState } from 'react'
import { map } from 'lodash';
import { StyleSheet, Text, View } from 'react-native'
import { Icon, ListItem } from 'react-native-elements';

import Modal from '../Modal';
import ChangeDisplayNameForm from './ChangeDisplayNameForm';

export default function AccountOptions({user, toastRef}) {

    const [showModal, setShowModal] = useState(false)
    const [renderComponent, setRenderComponent] = useState(null)
    
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

    const menuOptions = generateOptions();

    const selectedComponet = (key) => {
        switch (key) {
            case "displayName":
                setRenderComponent(
                    <ChangeDisplayNameForm
                        displayname={user.displayname}
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                    />
                )
                break;
            case "email":
                setRenderComponent(
                    <Text>email</Text>
                )
                break;
            case "password":
                setRenderComponent(
                    <Text>password</Text>
                )
                break;
        }
        setShowModal(true)
    }
     
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
                {
                    renderComponent
                }
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#6d1a1a"
    }
})
