import { map } from 'lodash';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon, ListItem } from 'react-native-elements';

export default function AccountOptions({user, toastRef}) {
    const menuOptions = generateOptions();
    return (
        <View>
            {
                map(menuOptions, (menu, index) => (
                    <ListItem
                        key={index}
                        style={styles.menuItem}
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
        </View>
    )
}

function generateOptions () {
    return [
        {
            title: "Cambiar Nombres y Apellidos", 
            iconNameLeft: "account-circle",
            iconColorLeft: "#0b7b83",
            iconNameRight: "chevron-right",
            iconColorRight: "#0b7b83",
        },
        {
            title: "Cambiar Email", 
            iconNameLeft: "at",
            iconColorLeft: "#0b7b83",
            iconNameRight: "chevron-right",
            iconColorRight: "#0b7b83",
        },
        {
            title: "Cambiar Contraseña", 
            iconNameLeft: "lock-reset",
            iconColorLeft: "#0b7b83",
            iconNameRight: "chevron-right",
            iconColorRight: "#0b7b83",
        }
    ]
}
const styles = StyleSheet.create({
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#6d1a1a"
    }
})
