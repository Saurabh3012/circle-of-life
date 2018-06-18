import React, { Component } from "react";
import { Layout, Menu, Collapse, Timeline, List } from 'antd';
import 'antd/dist/antd.css';
import Spinner from './components/Spinner';
import axios from 'axios';
import './assets/css/SearchBar.css';
import _ from 'lodash';
const { Content, Sider } = Layout;


class App1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apiData : {},
      commands: [],
      selectedItem: {},
      success: false
    }

    this.fetchData();

  }

  fetchData(){
      let list = [];
      axios({
        method: 'GET',
        url: 'http://localhost:3000/list'
      }).then((apiData) => {
        // console.log(apiData);
        apiData.data.data.forEach((item)=>{
          list.push(item.call);
        });
        this.setState({
          apiData: apiData.data,
          commands: list,
          success: false
        });
        console.log(this.state);
      }).catch((e)=>{
        console.error(e);
      });
  }

  hitQuery = (query, apiData) => {

    var delayInMilliseconds = Math.random(); //1 second

    setTimeout(() => {
      console.log(query);
      let filtered = _.find(apiData.data, (x) => { return x.call === query });
      console.log(apiData);
      console.log(filtered);
      this.setState({
        selectedItem: filtered,
        success: true
      })
    }, delayInMilliseconds);

  }

  render() {

    const { apiData, success, commands, selectedItem } = this.state;

    return (

      <Layout>

        <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }} width={300} >
          <Menu theme="dark" mode="inline" >
            <Menu.Item className="it" disabled>
              <span className="nav-text">DASHBOARD</span>
            </Menu.Item>
            {
              commands.map((item, index)=>{
                return(
                  <Menu.Item className="men" key={index}  >
                    <span onClick={()=>{this.hitQuery(item, apiData )}} className="nav-text">Call No. {index+1}</span>
                  </Menu.Item>
                );
              })
            }
          </Menu>
        </Sider>

         <Layout style={{ marginLeft: 300 }}>

           <Content style={{ overflow: 'initial' }}>
             <div style={{ padding: 110, background: '#fff', textAlign: 'center' }}>

                {success ? (
                  <div>
                  <br />
                  <br />
                  <h1> ANALYSIS </h1>
                  <pre>

                    <h4> Number of Columns: {selectedItem.numCols}</h4>
                    <h4> Number of Rows: {selectedItem.numRows}</h4>
                    <h4> Time elapsed in Process 1: {selectedItem.cTime - selectedItem.rTime}</h4>
                    <h4> Time elapsed in Process 2: {selectedItem.p2Finish - selectedItem.cTime}</h4>

                  </pre>



                  </div>
                ):(<Spinner text={"Choose a call number from the side bar to see it's analysis"} />)}

             </div>
           </Content>

         </Layout>
      </Layout>

    );
  }

}

export default App1;
