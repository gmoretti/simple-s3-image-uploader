import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import S3FileUpload from 'react-s3';
import Dropzone from 'react-dropzone'

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      imageName: '',
      imagesUpload: [],
      previewsHTML: []
    };

    this.imageBaseName = 'https://test-bucket-4938.s3.eu-west-3.amazonaws.com/simple-s3-subdir-test/';
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDrag = this.handleDrag.bind(this);

  }


  handleChange(event) {
    console.log("changed");
    this.setState({value: event.target.value});
  }
  
  handleSubmit(event) {
    this.setState({imageName: this.imageBaseName + this.state.value + '/' + this.state.value});    
    event.preventDefault();
  }

  handleDrag(acceptedFiles) {
    let files = this.state.imagesUpload;
    let imagesToUploadPreview = this.state.previewsHTML;
    
    files.push(acceptedFiles);
    for (let i=0; i < acceptedFiles.length; i++) {
      imagesToUploadPreview.push(<img src={URL.createObjectURL(acceptedFiles[i])}/>);
    }

    console.log(imagesToUploadPreview);

    this.setState({
      imagesUpload: files,
      previewsHTML: imagesToUploadPreview
    });
  }

  render() {
  
    const config = {
      bucketName: 'test-bucket-4938',
      dirName: 'simple-s3-subdir-test', /* optional */
      region: 'eu-west-3',
      accessKeyId: 'AKIAT22NVXM3ZI5FPY6Z',
      secretAccessKey: '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'
    }

    var testFile = new File(["Hello"], "filename3.txt", {type: "text/plain"});

    /*S3FileUpload
      .uploadFile(testFile, config)
      .then(data => console.log(data))
      .catch(err => console.error(err))*/

    return (
      <div className="App">
        <header>
        </header>

        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>

        <img src={this.state.imageName && this.state.imageName + '1.jpeg'}/>
        <img src={this.state.imageName && this.state.imageName + '2.jpeg'}/>
        <img src={this.state.imageName && this.state.imageName + '3.jpeg'}/>
        <img src={this.state.imageName && this.state.imageName + '4.jpeg'}/>
 
        <Dropzone onDrop={acceptedFiles => this.handleDrag(acceptedFiles)}>
          {({getRootProps, getInputProps}) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>
        <div>
          {this.state.previewsHTML}
        </div>

      </div>
    );
  }
}
export default App;
