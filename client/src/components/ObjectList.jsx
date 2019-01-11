import React, {Component} from 'react';
import {withS3Context} from '../context/S3Context';
import moment from 'moment';

class ObjectList extends Component {
    render() {
        const { items } = this.props;
        return (
            <div className="table-responsive">
                <table className="table table-sm">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">NAME</th>
                            <th scope="col">LAST_MODIFIED</th>
                            <th scope="col">CONTENT TYPE</th>
                            <th scope="col">SIZE</th>
                            <th scope="col">METADATA</th>
                            <th></th>
                        </tr>
                    </thead>   
                    <tbody>
                        {
                            items.map( ({Key, LastModified, Size, ContentType, url}, index) => 
                                <tr key={index}>
                                    <td>
                                        { Size > 0 ?
                                            <a href={url} target="_blank">{Key}</a> :
                                            <span>{Key}</span>
                                        }
                                    </td>
                                    <td>{moment(LastModified).format('YYYY-MM-DD HH:mm:SSS')}</td>
                                    <td>{ContentType}</td>
                                    <td>{Size}</td>
                                    <td></td>
                                </tr>
                                )
                        }
                    </tbody>             
                </table>
            </div>
        )
    }

}

export default withS3Context(ObjectList);