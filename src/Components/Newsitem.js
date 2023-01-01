
import React, { Component } from 'react'

export class Newsitem extends Component {


    render() {
        let { title, description, imgUrl, newsUrl, author, publishedAt, source } = this.props;
        return (
            <div className='my-3 '>
                <div className="card mx-auto" style={{ width: "18rem" }}>
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ zIndex: "1", left: "90%" }}>
                        {source}
                    </span>
                    <img src={imgUrl ? imgUrl : "https://static.toiimg.com/photo/msid-95837046/95837046.jpg?pl=37494"} className="card-img-top" alt="..." style={{ height: "180px" }} />
                    <div className="card-body">
                        <h5 className="card-title" style={{ width: "17rem" }}>{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-primary btn-dark btn-sm">Read More</a>
                        <p className="card-text"><small className="text-muted">By {author} publised at {new Date(publishedAt).toGMTString()}</small></p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Newsitem
