import React, { useEffect, useState } from 'react'
import {
  View,
  Image,
  Dimensions,
  FlatList,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Text, useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { api } from '../helpers/axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ScheduleCard = ({ Counselor, session, status }) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('LivyChat', { Counselor })
      }}
      style={{
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 20,
        flexDirection: 'row',
        height: 130,
        gap: 10,
        marginVertical: 5,
      }}
    >
      <Image
        source={{ uri: Counselor.image || 'https://picsum.photos/800/450' }}
        style={{
          flex: 2,
          borderRadius: 10,
        }}
      />
      <View style={{ flex: 5, justifyContent: 'space-around' }}>
        <View>
          <Text style={{ fontWeight: '800', fontSize: 12.5 }}>
            {new Date(session).toLocaleString('id-ID', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            })}
          </Text>
          <Text style={{ fontSize: 11.5, color: 'gray' }}>
            {Counselor.name}
          </Text>
          <Text style={{ fontSize: 11, color: 'red' }}>{status}</Text>
        </View>

        <View style={{ alignItems: 'flex-end' }}>
          <Pressable
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 16,
              borderRadius: 4,
              elevation: 3,
              backgroundColor: useTheme().colors.secondary,
            }}
            onPress={() => {}}
          >
            <Text
              style={{
                fontSize: 10,
                lineHeight: 21,
                color: 'white',
              }}
            >
              Beri Penilaian
            </Text>
          </Pressable>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default function Schedule() {
  const navigation = useNavigation()
  const [schedule, setSchedule] = useState([])
  const [counselors, setcounselors] = useState([])
  const [focus, setFocus] = useState(false)
  const fetchCounselors = async () => {
    const res = await api.get('/client/counselors')
    console.log(res.data)
    setcounselors(res.data)
  }
  const fetchSchedule = async () => {
    try {
      const response = await api.get('/client/schedule')
      console.log(response.data)
      setSchedule(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  navigation.addListener('focus', () => {
    setFocus(true)
  })

  navigation.addListener('blur', () => {
    setFocus(false)
  })

  useEffect(() => {
    if (focus) {
      fetchSchedule()
      fetchCounselors()
    }
    return () => {
      setSchedule([])
      setcounselors([])
    }
  }, [focus])
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: useTheme().colors.primary,
        padding: 10,
      }}
    >
      <SafeAreaView />
      {schedule.map((item, i) => {
        return <ScheduleCard key={i} {...item} />
      })}

      {counselors.map((counselor) => {
        return (
          <TouchableOpacity
            style={{
              padding: 15,
              borderRadius: 20,
              flexDirection: 'row',
              height: 130,
              gap: 10,
              marginVertical: 5,
              width: '50%',
            }}
            onPress={() => {
              navigation.navigate('CounselorProfile', {
                counselorId: counselor.User.id,
              })
            }}
          >
            <View
              style={{
                borderRadius: 10,
                backgroundColor: '#eee',
                padding: 5,
              }}
            >
              <Text>{counselor.User.name}</Text>
            </View>
          </TouchableOpacity>
        )
      })}
    </ScrollView>
  )
}
