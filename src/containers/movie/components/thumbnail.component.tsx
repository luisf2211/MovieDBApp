import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../../../navigation/app.navigator";

const ThumbnailComponent: React.FC<{ id: number, title: string, overview: string, image: string, rating: number, release_date: string }> = ({ id, title, overview, image, rating = 1, release_date }) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const handleDetail = (id: number, title: string, overview: string, image: string, rating: number, release_date: string) => {
        navigation.navigate('MovieDetailScreen', {
            id,
            image,
            title,
            overview,
            rating,
            release_date
        });
    }

    return (
        <TouchableOpacity 
            onPress={() => handleDetail(id, title, overview, image, rating, release_date)} 
            style={styles.container} 
            activeOpacity={1}
        >
            <Text
                style={styles.title}
            >
                {title}
            </Text>
            <Text
                style={styles.overview}
            >
                {overview}
            </Text>
            <Text
                style={styles.releaseDate}
            >
                Fecha de estreno: {release_date}
            </Text>
            <View
                style={styles.votesStars}
            >
                <Text>
                    {Array.from({ length: Math.round(rating) }).map((_, index) => (
                        <Text key={index}>⭐️</Text>
                    ))}
                </Text>
            </View>
            <Text
                style={styles.votes}
            >
                Votos: {rating}
            </Text>
            <View
                style={styles.imageContainer}
            />
            <Image
                source={{ uri: image }}
                resizeMode="stretch"
                style={styles.image}
            />
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    imageContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.8)',
        zIndex: 1,
        borderRadius: 14,
    },
    image: {
        borderRadius: 14,
        height: 350,
        width: '100%',
    },
    votes: {
        position: 'absolute',
        bottom: 12,
        left: 0,
        right: 0,
        textAlign: 'justify',
        color: 'white',
        zIndex: 2,
        padding: 20,
        fontSize: 10,
        fontWeight: 'bold',
    },
    votesStars: {
        position: 'absolute',
        bottom: 10,
        left: 20,
        zIndex: 2,
    },
    releaseDate: {
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'justify',
        color: 'white',
        zIndex: 2,
        padding: 20,
        fontSize: 10,
        fontWeight: 'bold',
    },
    overview: {
        position: 'absolute',
        bottom: 60,
        left: 0,
        right: 0,
        textAlign: 'justify',
        color: 'white',
        zIndex: 2,
        padding: 20,
        fontSize: 10,
        fontWeight: 'bold',
    },
    title: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        textAlign: 'left',
        color: 'white',
        zIndex: 2,
        padding: 20,
        fontSize: 24,
        fontWeight: 'bold',
    },
    container: { flex: 1, width: '100%', position: 'relative' }
})

export default ThumbnailComponent;