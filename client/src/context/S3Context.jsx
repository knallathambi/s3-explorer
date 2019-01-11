import React, {Component} from 'react';
import axios from 'axios';

const S3Context = React.createContext();
const S3Consumer = S3Context.Consumer;

const API_URL = 'http://localhost:9080/api/s3'

class S3Provider extends Component {
    state = {
        prefix: '',
        bucketName: '',
        items: []
    }

    componentDidMount() {
        this.getBucketName();
        this.fetchObjects(this.state.prefix);
    }

    getBucketName = async () => {
        try {
            const {data} = await axios.get(`${API_URL}/bucket`);
            console.log(data);
            this.setState({ bucketName: data })
        } catch (err) {
            console.error(err);
        }
    }

    fetchObjects = async prefix => {
        try {
            const {data} = await axios.get(`${API_URL}/list?prefix=${prefix}`);
            console.log(data);
            const items = data.map( item => ({...item, url: `${API_URL}?key=${item.Key}`}))
            this.setState({ items })
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        const {bucketName, items, prefix} = this.state;
        return (
            <S3Context.Provider value={{
                bucketName,
                items,
                prefix
            }}>
                {
                    this.props.children
                }
            </S3Context.Provider>
        )
    }
}

export { S3Provider, S3Consumer };

export function withS3Context(WrappedComponent) {
    return class extends Component {
        render() {
            return (
                <S3Consumer>
                    {props => <WrappedComponent  {...props} />}
                </S3Consumer>
            )
        }
    }
}