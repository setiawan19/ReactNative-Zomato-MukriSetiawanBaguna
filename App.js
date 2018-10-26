import React, { Component } from 'react';
import { ScrollView, Image} from 'react-native';
import { Container, Header, Button, Content, Text,Thumbnail, Left, List, ListItem, Body, Item, 
          Icon, Input, Footer, FooterTab, View, Card, CardItem , Right} from 'native-base';
import axios from 'axios';

class App extends Component {

  constructor(){
    super();
    this.state = {resto: [], textapi:""};
  }

  cariresto(){
    var url = `https://developers.zomato.com/api/v2.1/search?q=${this.state.textapi}`;
    var config = {
      headers:{'user-key':'c327a06a57952c03405faac8cb84443e'}
    };

    axios.get(url, config).then((ambilData)=>{
      this.setState({
        resto: ambilData.data.restaurants,
      })
      console.log(url);
    })
  }

  render(){
    const data = this.state.resto.map((v,i) => {
      var nama = v.restaurant.name;
      var kota = v.restaurant.location.city;
      var alamat = v.restaurant.location.address;
      var harga = v.restaurant.average_cost_for_two;
      var gambar = v.restaurant.thumb;
      return (
        <ListItem avatar key={i}>
          <Content>
            <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{uri:gambar}} />
                <Body> 
                  <Text> {nama} </Text>
                  <Text note> {kota} </Text>  
                </Body> 
              </Left> 
              <Right>
                <Text>Rp. {harga}</Text>
              </Right>
            </CardItem>
            <CardItem>            
              <Body>
                <Image source={{uri:gambar}} style={{height: 200, width: 370, flex: 1}}/>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Icon name="home" />
                <Text>{alamat}</Text>
              </Left>
            </CardItem>
            </Card>
          </Content>
        </ListItem>
      )
    })

    return(
      <Container>
        <Header searchBar rounded style={{backgroundColor:'red'}}>
          <Item>
            <Icon name="search" />
            <Input placeholder="Cari Menu..." onChangeText={(text) => this.setState({textapi: text})}/>
          </Item>
        </Header>
        <Content>
          <Button full style={{backgroundColor:'red'}} onPress={()=>{this.cariresto()}}>
            <Text>LIHAT DAFTAR RESTO</Text>
          </Button>        
          <ScrollView>
            <List>
              {data}
            </List>
          </ScrollView>
        </Content>
      </Container>
    )
  }
}


export default App;
