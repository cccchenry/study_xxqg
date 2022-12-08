import React, {Component} from "react";
import {getAbout} from "../../utils/api";

class Help extends Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            about: ""
        };
    }

    componentDidMount() {
        getAbout().then((value)=>{
            this.setState({
                about:value.data

            })
        })

    }
    render() {
        return <>
            <h1 style={{color:"red",margin:10}}>软件开发不易，若你使用感觉还好，请多多赞赏管理员哦~</h1><br/>
        </>
    }
}

export default Help
