import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import './App.css';
import Particles from 'react-particles-js';


const paticlesOptions = {
  polygon: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const intialState = {
      //test: "Hilo",
      input: "",
      imageUrl: "",
      box: {},
      route: "signin",
      isSignedIn: false,
      user: {
        id: "x",
        name: "",
        email: "",
        entries: 0,
        joined: ""
      }
}

class App extends Component {

  constructor() {
    super();
    this.state = intialState;
  }

  // componentDidMount() {
  //   fetch("http://localhost:3000")
  //   .then(response => response.json())
  //   .then(console.log)
  // }

  loadUser =(data)=> {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }});
  }

  calculateFaceLocation = (data) => {
    // console.log("Inside calcl");

    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    //console.log(width, height);

    return {
      top_row: clarifaiFace.top_row*height,
      right_col: width - (clarifaiFace.right_col*width),
      bottom_row: height - (clarifaiFace.bottom_row*height),
      left_col: clarifaiFace.left_col*width
    }

  }

  displayFaceBox = (box) => {
    // console.log("Face box");
    this.setState({box: box});
  }

  onInputChange = (event) => {
    //console.log(event.target.value);
    // debugger;
    this.setState({input: event.target.value});
    // debugger;
  }

  // calcBox = () => {
  //   console.log("calcBox");
  // }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});

    fetch("http://localhost:3000/imageurl", {
          method: "post",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
              input: this.state.input
              // id: "123"
            })
        })
    .then(response => response.json())
    .then(response => {
      // console.log("Resp");
      if (response) {
        // console.log(this.state.user.id);
        // this.calcBox();

        // fetch("http://localhost:3000/image",
        //   {
        //     method: "put",
        fetch("http://localhost:3000/image", {
          method: "put",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
              id: this.state.user.id
              // id: "123"
            })
        })
        .then(response => response.json())
        .then(count => {
          // console.log(count)
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
        .catch(console.log)
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    },
    function(err) {
      console.log("Error");
      // console.log("HHH");
      // this.calcBox();
    }
    );
  }

  // onButtonSubmit2 = () => {
  //   this.setState({imageUrl: this.state.input});
  //   app.models
  //     .predict(
  //       Clarifai.FACE_DETECT_MODEL, this.state.input)
  //     .then(response => {
  //       if (response) {

  //         fetch('http://localhost:3000/image', {
  //           method: 'put',
  //           headers: {'Content-Type': 'application/json'},
  //           body: JSON.stringify({
  //             id: this.state.user.id
  //           })
  //         })
  //           .then(response => response.json())
  //           .then(count => {
  //             this.setState(Object.assign(this.state.user, { entries: count}))
  //           })

  //       }
  //       this.displayFaceBox(this.calculateFaceLocation(response))
  //     })
  //     .catch(err => console.log(err));
  // }

  onRouteChange = (route) =>{

    if (route === "signout") {
      this.setState(intialState);
    } else if (route === "home") {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }


  render() {
    const {isSignedIn, box, imageUrl, route} = this.state
    return (
      <div className="App">

      <Particles className='particles'
      params={paticlesOptions} 
      />


      <Navigation 
      isSignedIn={isSignedIn} 
      onRouteChange={this.onRouteChange}
      />

      { 
        route === "home"
        ? <div>
        <Logo />

        <Rank 
        name = {this.state.user.name}
        entries = {this.state.user.entries}
        na = {this.state.user.name}
        />

        <ImageLinkForm 
        onInputChange={this.onInputChange} 
        onButtonSubmit={this.onButtonSubmit}
        />

        <FaceRecognition
        box={box} 
        imageUrl={imageUrl}
        />
        </div>

        :(
        route === "signin"
        ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>

        :( 
        route === "register"
        ? <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>

        : <SignIn onRouteChange={this.onRouteChange}/>
        )
        )
      }
      </div>
      );
  }
}

export default App;
