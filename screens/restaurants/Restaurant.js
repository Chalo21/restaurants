import React, { useState, useEffect } from 'react'
import { map } from 'lodash'
import { Alert, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Icon, ListItem, Rating } from 'react-native-elements'

import CarouselImage from '../../components/CarouselImage'
import Loading from '../../components/Loading'
import MapRestaurant from '../../components/restaurants/MapRestaurant'
import { getDocumentById } from '../../utils/actions'
import { formatPhone } from '../../utils/helpers'

const widthScreen=Dimensions.get("window").width

export default function Restaurant({navigation, route}) {
    const { id, name } = route.params
    const [restaurant, setRestaurant] = useState(null)
    const [activeSlide, setActiveSlide] = useState([0])

    console.log(restaurant)
    
    navigation.setOptions({title: name})

    useEffect(() => {
        (async() => {
            const response = await getDocumentById("restaurants", id)
            if(response.statusResponse){
                setRestaurant(response.document)
            } else {
                setRestaurant({})
                Alert.alert("Ocurrió un problema cargando el restaurante. Intente más tarde.")
            }
        })()
    }, [])

    if(!restaurant) {
        return <Loading isVisible={true} text="Cargando..."/>
    }
    return (
        <ScrollView style={styles.viewBody}>
            <CarouselImage
                images={restaurant.images}
                height={250}
                width={widthScreen}
                activeSlide={activeSlide}
                setActiveSlide={setActiveSlide}
            />
            <TitleRestaurant
                name={restaurant.name}
                description={restaurant.description}
                rating={restaurant.rating}
            />
            <RestaurantInfo
                name={restaurant.name}
                location={restaurant.location}
                address={restaurant.address}
                email={restaurant.email}
                phone={formatPhone(restaurant.callingCode,restaurant.phone)}
            />
        </ScrollView>
    )
}

function RestaurantInfo({name, location, address, email, phone}){
    const listInfo = [
        {text: address, iconName: "map-marker"},
        {text: phone, iconName: "phone"},
        {text: email, iconName: "at"}
    ]

    return (
        <View style={styles.viewRestaurantInfo}>
            <Text style={styles.restaurantInfoTitle}>
                Información sobre el restaurante
            </Text>
            <MapRestaurant
                location={location}
                name={name}
                height={150}
            />
            {
                map(listInfo, (item, index) => (
                    <ListItem
                        key={index}
                        style={styles.containerListItem}
                    >
                        <Icon
                            type="material-community"
                            name={item.iconName}
                            color="#6d1a1a"
                        />
                        <ListItem.Content>
                            <ListItem.Title>{item.text}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                ))
            }
        </View>
    )

}

function TitleRestaurant({name, description, rating}) {
    return(
        <View style={styles.viewRestaurantTitle}>
            <View style={styles.viewRestaurantContainer}>
                <Text style={styles.restaurantName}>{name}</Text>
                <Rating
                    style={styles.rating}
                    imageSize={20}
                    readonly
                    startingValue={parseFloat(rating)}
                />
            </View>
            <Text style={styles.descriptionRestaurant}>{description}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    viewBody : {
        flex: 1,
        backgroundColor: "#fff"
    },
    viewRestaurantTitle : {
        padding: 15,
    },
    viewRestaurantContainer : {
        flexDirection: "row"
    },
    restaurantName : {
        fontWeight: "bold"
    },
    descriptionRestaurant : {
        marginTop: 5,
        color: "gray",
        textAlign: "justify"
    },
    rating : {
        position: "absolute",
        right: 0
    },
    viewRestaurantInfo : {
        margin: 15,
        marginTop: 25
    },
    restaurantInfoTitle : {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15
    },
    containerListItem : {
        borderBottomColor: "#0b7b83",
        borderBottomWidth: 1
    }
})
