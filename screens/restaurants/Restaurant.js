import React, { useState, useCallback, useRef, useEffect } from 'react'
import { map } from 'lodash'
import { Alert, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Icon, ListItem, Rating } from 'react-native-elements'
import { useFocusEffect } from '@react-navigation/native'
import firebase from 'firebase/app' 
import Toast from 'react-native-easy-toast'

import CarouselImage from '../../components/CarouselImage'
import Loading from '../../components/Loading'
import MapRestaurant from '../../components/restaurants/MapRestaurant'
import { addDocumentWithoutId, getCurrentUser, getDocumentById, getIsFavorite, deleteFavorite } from '../../utils/actions'
import { callNumber, formatPhone, sendEmail, sendWhatsApp } from '../../utils/helpers'
import ListReviews from '../../components/restaurants/ListReviews'

const widthScreen=Dimensions.get("window").width

export default function Restaurant({navigation, route}) {
    const { id, name } = route.params
    const toastRef = useRef()

    const [restaurant, setRestaurant] = useState(null)
    const [activeSlide, setActiveSlide] = useState([0])
    const [isFavorite, setIsFavorite] = useState(false)
    const [userLogged, setUserLogged] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(false)

    firebase.auth().onAuthStateChanged(user => {
        user ? setUserLogged(true) : setUserLogged(false)
        setCurrentUser(user)
    })
    
    navigation.setOptions({title: name})

    useFocusEffect(
        useCallback(() => {
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
    )

    useEffect(() => {
        (async() => {
            if(userLogged && restaurant) {
                const response = await getIsFavorite( restaurant.id )
                response.statusResponse && setIsFavorite(response.isFavorite)
            }
        })()
    }, [userLogged, restaurant])

    const addFavorite = async() => {
        if(!userLogged) {
            toastRef.current.show("Para agregar el restaurante a favoritos debes estar logueado.", 3000)
            return
        }
        setLoading(true)
        const response = await addDocumentWithoutId("favorites", {
            idUser: getCurrentUser().uid,
            idRestaurant: restaurant.id
        })
        if(response.statusResponse) {
            setIsFavorite(true)    
            toastRef.current.show("Restaurante añadido a favoritos.", 3000)
        }
        else {
            toastRef.current.show("No se pudo adicionar el restaurante a favoritos. Por favor intenta más tarde.", 3000)
        }
        setLoading(false)
    }

    const removeFavorite = async() => {
        setLoading(true)
        const response = await deleteFavorite(restaurant.id)
        if(response.statusResponse){
            setIsFavorite(false)    
            toastRef.current.show("Restaurante eliminado de favoritos.", 3000)
        } 
        else {
            toastRef.current.show("No se pudo eliminar el restaurante de favoritos. Por favor intenta más tarde.", 3000)
        }
        setLoading(false)
    }

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
            <View style={styles.viewFavorite}>
                <Icon
                    type="material-community"
                    name={ isFavorite ? "heart" : "heart-outline"}
                    onPress={ isFavorite ? removeFavorite : addFavorite }
                    color={ isFavorite ? "#6d1a1a" : "#0b7b83"}
                    size={35}
                    underlayColor="transparent"
                />
            </View>
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
                currentUser={currentUser}
            />
            <ListReviews
                navigation={navigation}
                idRestaurant={restaurant.id}
            />
            <Toast ref={toastRef} position="center" opacity={0.9}/>
            <Loading isVisible={loading} text={"Por favor espere..."}/>
        </ScrollView>
    )
}

function RestaurantInfo({name, location, address, email, phone, currentUser}){
    const listInfo = [
        {type: "addres" ,text: address, iconLeft: "map-marker"},
        {type: "phone" ,text: phone, iconLeft: "phone", iconRight: "whatsapp"},
        {type: "email" ,text: email, iconLeft: "at"}
    ]

    const actionLeft = (type) => {
        if (type == "phone") {
            callNumber(phone)
        } else if( type== "email" ) {
            if(currentUser){
                sendEmail(email, "Interesado", `Soy ${currentUser.displayName}, estoy interesado en sus servicios.`)
            } else {
                sendEmail(email, "Interesado", `Estoy interesado en sus servicios.`)
            }
        }

    }

    const actionRight = (type) => {
        if (type == "phone") {
            if(currentUser){
                sendWhatsApp(phone, `Soy ${currentUser.displayName}, estoy interesado en sus servicios.`)
            } else {
                sendWhatsApp(phone, `Estoy interesado en sus servicios.`)
            }
        }
    }

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
                            name={item.iconLeft}
                            color="#6d1a1a"
                            onPress={() => actionLeft(item.type)}
                            />
                        <ListItem.Content>
                            <ListItem.Title>{item.text}</ListItem.Title>
                        </ListItem.Content>
                        {
                            item.iconRight && (
                                <Icon
                                type="material-community"
                                name={item.iconRight}
                                color="#6d1a1a"
                                onPress={() => actionRight(item.type)}
                                />
                            )
                        }
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
    },
    viewFavorite : {
        position: "absolute",
        top: 0,
        right: 0,
        backgroundColor: "#fff",
        borderBottomLeftRadius: 100,
        padding: 5,
        paddingLeft: 15
    }
})
