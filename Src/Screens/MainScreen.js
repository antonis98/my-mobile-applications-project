import React, { Component } from 'react';
import {StyleSheet,Text,View,TextInput,TouchableOpacity,Keyboard,Alert,PermissionsAndroid,ScrollView,FlatList} from 'react-native';
import {Actions, Router} from 'react-native-router-flux';
import Geolocation from 'react-native-geolocation-service';


async function requestLocationPermission(){
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message:
          'This app requires access to your location.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can access location');
      return true;
    } else {
      console.log('Location permission denied');
      return false;
    }
  } catch (err) {
    console.warn(err);
  }
}

export default class MainScreen extends Component {
  goBack() {
      Actions.pop()
  }
  GotoUser() {
      Actions.GotoUser()
  }

  constructor(props){
    super(props);
    this.state = {
      locations: [],
      overall_rating:"",
      price_rating:"",
      quality_rating:"",
      clenliness_rating:"",
      review_body:"",
      loc_id:"",
      reviews:"",
      location: null,
      locationPermission: false
    }

  }

  componentDidMount(){
    this.findCoordinates();
  }

  findCoordinates() {
    console.log("state", this.state);
    if(!this.state.locationPermission){
      console.log("asking for permission...");
      this.state.locationPermission = requestLocationPermission();
    }

    Geolocation.getCurrentPosition((position) => {
      const location = JSON.stringify(position);
      this.setState({location});
    }, (error) => {
      Alert.alert(error.message);
    }, {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000
    });
  }

  Logout = () => {
    return fetch("http://10.0.2.2:3333/api/1.0.0/user/logout", {
    method: 'post',
    headers: {
      'X-Authorization':token
    },
    })
          .then((response) => response.json())
          .then((responseJson) => {
              console.log(responseJson);
              this.setState({

              })
          })
          .catch((error) => {
              console.log(error);
          });
      }
      componentDidMount(){
        this.Getlocations();
      }

      Getlocations= () => {
        return fetch("http://10.0.2.2:3333/api/1.0.0/find", {
          headers: {
            'X-Authorization':token
          },
        })
              .then((response) => response.json())
              .then((responseJson) => {
                  console.log(responseJson);
                  this.setState({
                    locations: responseJson
                  })
              })
              .catch((error) => {
                  console.log(error);
              });
          }

      Getlocationsinfo= (id) => {
       return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+id, {
         headers: {
           'X-Authorization':token
         },
       })
             .then((response) => response.json())
             .then((responseJson) => {
                 console.log(responseJson);
                 this.setState({
                   reviews:responseJson.location_reviews,
                   loc_id:responseJson.location_id
                 })
             })
             .catch((error) => {
                 console.log(error);
             });
         }

          Favlocations= (id) => {
            return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+id+"/favourite", {
              method: 'post',
              headers: {
                'Content-Type': 'application/json',
                'X-Authorization':token
              },
            })
                  .catch((error) => {
                      console.log(error);
                  });
              }

              UnFavlocations= (id) => {
                return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+id+"/favourite", {
                  method: 'delete',
                  headers: {
                    'X-Authorization':token
                  },
                })
                    .catch((error) => {
                          console.log(error);
                      });
                  }

              likedReview= (id) => {
                return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+this.state.loc_id+"/review/"+id+"/like", {
                  method: 'post',
                  headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization':token
                  },
                })
                      .catch((error) => {
                          console.log(error);
                      });
                  }

                  UnlikeReview= (id) => {
                    return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+this.state.loc_id+"/review/"+id+"/like", {
                      method: 'delete',
                      headers: {
                        'X-Authorization':token
                      },
                    })
                        .catch((error) => {
                              console.log(error);
                          });
                      }

                      addreview = () => {
                            let to_send = {
                              overall_rating: parseInt(this.state.overall_rating),
                              price_rating: parseInt(this.state.price_rating),
                              quality_rating: parseInt(this.state.quality_rating),
                              clenliness_rating: parseInt(this.state.clenliness_rating),
                              review_body: this.state.review_body,
                            };
                            return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+this.state.loc_id+"/review", {
                              method: 'post',
                              headers: {
                                'Content-Type': 'application/json',
                                'X-Authorization':token
                              },
                              body: JSON.stringify(to_send)
                            })
                            .then((response) => response.json())
                            .then((responseJson) => {

                              })
                            .catch((error) => {
                              console.log(error);
                            })
                          }

                          Updatereview = (id) => {
                                let to_send = {
                                  overall_rating: parseInt(this.state.overall_rating),
                                  price_rating: parseInt(this.state.price_rating),
                                  quality_rating: parseInt(this.state.quality_rating),
                                  clenliness_rating: parseInt(this.state.clenliness_rating),
                                  review_body: this.state.review_body,
                                };
                                return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+this.state.loc_id+"/review/"+id, {
                                  method: 'patch',
                                  headers: {
                                    'Content-Type': 'application/json',
                                    'X-Authorization':token
                                  },
                                  body: JSON.stringify(to_send)
                                })
                                .then((response) => response.json())
                                .then((responseJson) => {

                                    })
                                .catch((error) => {
                                  console.log(error);
                                })
                              }

                          DelReview= (id) => {
                            return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+this.state.loc_id+"/review/"+id, {
                              method: 'delete',
                              headers: {
                                'X-Authorization':token
                              },
                            })
                                .catch((error) => {
                                      console.log(error);
                                  });
                              }

  render() {
      return(
        <View style={styles.container}>
            <TouchableOpacity onPress={this.GotoUser}><Text style={styles.acountinfo}>Acount Information</Text></TouchableOpacity>
            <View style={styles.header}>
              <FlatList
                data={this.state.locations}
                renderItem={({item}) => (
                    <View>
                    <ScrollView>
                      <Text style={styles.infoText}>Town: {item.location_town}</Text>
                      <Text style={styles.infoText}>Coffe Place Name: {item.location_name}</Text>
                      <Text style={styles.infoText}>Avg-Rating: {item.avg_overall_rating}</Text>
                      <Text style={styles.infoText}>Avg-Price Rating: {item.avg_price_rating}</Text>
                      <Text style={styles.infoText}>Avg-Quality Rating: {item.avg_quality_rating}</Text>
                      <Text style={styles.infoText}>Avg-Clenliness Rating: {item.avg_clenliness_rating}</Text>
                      <TouchableOpacity onPress={() => { this.Favlocations(item.location_id);  }}><Text style={styles.Button}>Favourite This Location</Text></TouchableOpacity>
                      <TouchableOpacity onPress={() => { this.UnFavlocations(item.location_id);  }}><Text style={styles.Button}>UnFavourite This Location</Text></TouchableOpacity>
                      <TouchableOpacity onPress={() => { this.Getlocationsinfo(item.location_id);  }}><Text style={styles.Button}>Reviews</Text></TouchableOpacity>
                      <Text style={styles.infoText}>------------------------------------------------</Text>
                      </ScrollView>
                    </View>
                )}
                keyExtractor={(item,index) => index.toString()}
              />
            </View>
            <View style={styles.mainbody}>
            <FlatList
              data={this.state.reviews}
              renderItem={({item}) => (
                  <View>
                  <ScrollView>
                    <Text style={styles.infoText}>Rating: {item.overall_rating}</Text>
                    <Text style={styles.infoText}>Price Rating: {item.price_rating}</Text>
                    <Text style={styles.infoText}>Quality Rating: {item.quality_rating}</Text>
                    <Text style={styles.infoText}>Clenliness Rating: {item.clenliness_rating}</Text>
                    <Text style={styles.infoText}>Review: {item.review_body}</Text>
                    <TouchableOpacity onPress={() => { this.likedReview(item.review_id);  }}><Text style={styles.Button}>Like the Review</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.UnlikeReview(item.review_id);  }}><Text style={styles.Button}>UnLike the Review</Text></TouchableOpacity>
                    <Text style={styles.infoText}>Likes: {item.likes}</Text>
                    <TouchableOpacity onPress={() => { this.addreview();  }}><Text style={styles.Button}>Add a Review</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.Updatereview(item.review_id);  }}><Text style={styles.Button}>Update Review</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.DelReview(item.review_id);  }}><Text style={styles.Button}>Delete Review</Text></TouchableOpacity>
                    <TextInput style={styles.inputBox}
                    onChangeText={(overall_rating) => this.setState({overall_rating})}
                    placeholder="Rating"
                    />
                    <TextInput style={styles.inputBox}
                    onChangeText={(price_rating) => this.setState({price_rating})}
                    placeholder="Pricing"
                    />
                    <TextInput style={styles.inputBox}
                    onChangeText={(quality_rating) => this.setState({quality_rating})}
                    placeholder="Quality"
                    />
                    <TextInput style={styles.inputBox}
                    onChangeText={(clenliness_rating) => this.setState({clenliness_rating})}
                    placeholder="Clenliness"
                    />
                    <TextInput style={styles.inputBox}
                    onChangeText={(review_body) => this.setState({review_body})}
                    placeholder="Add Your Review"
                    />
                    <Text style={styles.infoText}>------------------------------------------------</Text>
                    </ScrollView>
                  </View>
              )}
              keyExtractor={(item,index) => index.toString()}
            />
            </View>
            <View style={styles.logoutTextCont}>
                <Text style={styles.logoutText}>Do you want to logout? </Text>
                <TouchableOpacity onPress={() => { this.Logout(); this.goBack();  }}><Text style={styles.Button}>Logout</Text></TouchableOpacity>
            </View>
            </View>
      )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white'
    },
    logoutTextCont: {
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingVertical: 15,
      flexDirection: 'row'
    },
    logoutText: {
      color: 'black',
      fontSize:17
    },
    Button: {
        color: 'blue',
        fontSize:17,
        fontWeight: '500'
      },
      acountinfo:{
        color: 'blue',
        fontSize:17,
        fontWeight: '500'
      },
      header: {
        flex:6,
        flexDirection: 'row',
      },
      mainbody: {
        flex:5,
        flexDirection: 'row',
      },
      inputBox: {
          width: 250,
          backgroundColor: '#eeeeee',
          borderRadius: 25,
          paddingHorizontal: 10,
          fontSize: 15,
          color: 'black',
          marginVertical: 10
      },
      infoText: {
        color: 'black',
        fontSize:18,
      }
  });
