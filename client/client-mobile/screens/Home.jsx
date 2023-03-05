import { Ionicons } from '@expo/vector-icons'
import { Image } from 'react-native'
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  View,
  ImageBackground,
} from 'react-native'
import { Text, useTheme } from 'react-native-paper'

const ArticleCard = () => {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginRight: 10,
        width: (Dimensions.get('screen').width / 3.2) * 2,
        borderColor: '#408775',
        // borderWidth: .5,
        gap: 10,
      }}
    >
      <Text
        style={{ fontWeight: 'bold', fontSize: 20, flexWrap: 'nowrap' }}
        ellipsizeMode='tail'
        numberOfLines={2}
      >
        Ini Judul Article Tentang Sesuatu
      </Text>
      <Text
        style={{ fontWeight: 'normal', fontSize: 10, flex: 1, opacity: 0.7 }}
        ellipsizeMode='clip'
      >
        {new Date().toLocaleDateString('id-ID', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </Text>
      <View>
        <Image
          source={{ uri: 'https://picsum.photos/800/450' }}
          style={{
            width: '100%',
            aspectRatio: 16 / 9,
            borderRadius: 10,
            marginVertical: 10,
          }}
        />
      </View>
      <View style={{ flexDirection: 'row', gap: 5 }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 10,
            color: useTheme().colors.primary,
          }}
        >
          Continue Reading
        </Text>
        <Ionicons
          name='ios-arrow-forward'
          size={15}
          color={useTheme().colors.primary}
        />
      </View>
    </View>
  )
}

const VideoCard = () => {
  return (
    <View
      style={{
        overflow: 'hidden',
        paddingLeft: 15,
      }}
    >
      <ImageBackground
        source={{ uri: 'https://picsum.photos/800/450' }}
        resizeMode='cover'
        style={{
          backgroundColor: '#000',
          borderRadius: 15,
          paddingVertical: 10,
          paddingHorizontal: 15,
          marginRight: 10,
          width: (Dimensions.get('screen').width / 3.2) * 2,
          aspectRatio: 16 / 9,
          borderColor: '#408775',
          borderWidth: 1,
        }}
        imageStyle={{ borderRadius: 15, opacity: 0.5 }}
      >
        <View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              flexWrap: 'nowrap',
              color: '#fff',
            }}
            ellipsizeMode='tail'
          >
            Ini Judul Video Tentang Sesuatu
          </Text>
        </View>
      </ImageBackground>
    </View>
  )
}
const PodcastCard = () => {
  return (
    <View
      style={{
        overflow: 'hidden',
        padding: 15,
        width: '100%',
        height: 110,
      }}
    >
      <View
        style={{
          flex: 1,
          borderRadius: 15,
          // borderWidth: 0.5,
          // alignItems: 'center',
          flexDirection: 'row',
          gap: 10,
        }}
      >
        <View
          style={{
            // justifyContent: 'center',
            padding: 5,
            alignItems: 'center',
            // borderWidth: 0.5,
          }}
        >
          <Image
            source={require('../assets/Logo.png')}
            style={{ width: 50, height: 50 }}
          />
        </View>
        <View style={{ gap: 5 }}>
          <View>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 15,
                color: '#000',
                maxWidth: '90%',
              }}
              ellipsizeMode='tail'
              numberOfLines={1}
            >
              Ini Judul Podcast Tentang Sesuatu ads asd asd asd asd asd asd
            </Text>
            <Text
              style={{
                fontWeight: 'normal',
                fontSize: 10,
                color: '#000',
                maxWidth: '90%',
              }}
              ellipsizeMode='tail'
              numberOfLines={2}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
              doloribus at tempora et cum aspernatur ea, quidem mollitia ad,
              ipsam laboriosam perferendis tenetur sapiente. Accusamus ipsa
              consequuntur corporis atque excepturi.
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <View
              style={{
                backgroundColor: useTheme().colors.secondary,
                width: 25,
                height: 25,
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons name='ios-play' size={10} color='#fff' />
            </View>
            <Text style={{ fontSize: 10 }}>
              {new Date().toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default function Home() {
  return (
    <ScrollView style={{ flex: 1 }}>
      {/* <View
        style={{
          backgroundColor: '#408775',
          height: Dimensions.get('screen').height / 2,
          borderBottomEndRadius: 60,
          borderBottomStartRadius: 60,
          opacity: 0.2,
        }}
      ></View> */}
      <View
        style={{
          // transform: [{ translateY: -Dimensions.get('screen').height / 2.3 }],
          paddingHorizontal: 5,
          paddingTop: 20,
          gap: 10,
          // backgroundColor: '#e0e0e0',
        }}
      >
        <View
          style={{
            gap: 10,
            backgroundColor: useTheme().colors.primary,
            padding: 20,
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              fontWeight: 'bold',
              opacity: 0.7,
              fontSize: 10,
              color: '#fff',
            }}
          >
            {new Date().toLocaleDateString('id-ID', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: 15,
              color: '#fff',
            }}
          >
            Selamat Pagi, Livy!
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              backgroundColor: '#fff',
              borderRadius: 15,
              paddingVertical: 10,
              paddingHorizontal: 15,
              marginBottom: 25,
            }}
          >
            <Ionicons name='ios-trophy-outline' size={15} color='black' />
            <Text style={{ fontWeight: 'normal' }}>
              Focus on managing small things first
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: 5,
            alignItems: 'center',
            paddingHorizontal: 15,
            paddingVertical: 10,
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>Article</Text>
          <Text style={{ fontWeight: 'normal' }}>Terbaru</Text>
          <Ionicons
            name='ios-chevron-forward'
            size={15}
            color={useTheme().colors.primary}
          />
        </View>
        <ScrollView horizontal>
          <View style={{ flexDirection: 'row' }}>
            <ArticleCard />
            <ArticleCard />
            <ArticleCard />
            <ArticleCard />
          </View>
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            gap: 5,
            alignItems: 'center',
            paddingHorizontal: 15,
            paddingVertical: 10,
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>Video</Text>
          <Text style={{ fontWeight: 'normal' }}>Terbaru</Text>
          <Ionicons
            name='ios-chevron-forward'
            size={15}
            color={useTheme().colors.primary}
          />
        </View>
        <ScrollView horizontal>
          <View style={{ flexDirection: 'row' }}>
            <VideoCard />
            <VideoCard />
            <VideoCard />
            <VideoCard />
          </View>
        </ScrollView>

        <View
          style={{
            flexDirection: 'row',
            gap: 5,
            alignItems: 'center',
            paddingHorizontal: 15,
            paddingVertical: 10,
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>Podcast</Text>
          <Text style={{ fontWeight: 'normal' }}>Terbaru</Text>
          <Ionicons
            name='ios-chevron-forward'
            size={15}
            color={useTheme().colors.primary}
          />
        </View>
        <ScrollView>
          <View style={{ flexDirection: 'column' }}>
            <PodcastCard />
            <PodcastCard />
            <PodcastCard />
            <PodcastCard />
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  )
}
