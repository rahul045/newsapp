import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
export class Newscomp extends Component {
    static defaultProps = {
        country: 'stranger',
        pagesize: 8,
        category: "general"
    }
    static propTypes = {
        country: PropTypes.string,
        pagesize: PropTypes.number,
        category: PropTypes.string
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalArticles: 0

        }
        document.title = `${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} - NewsMan`
    }
    async updateNews() {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pagesize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        // this.props.setProgress(30);
        let parseData = await data.json();
        console.log(parseData);

        this.setState({
            articles: parseData.articles,
            totalArticles: parseData.totalResults,
            loading: false
        })
        this.props.setProgress(100);
    }
    // handleNext = async () => {
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.apiKey}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pagesize=${this.props.pagesize}`;
    //     this.setState({ loading: true })
    //     let data = await fetch(url);

    //     let parseData = await data.json();
    //     this.setState({
    //         page: this.state.page + 1,
    //         articles: parseData.articles,

    //         loading: false
    //     })
    //     this.setState({ page: this.state.page + 1 })
    //     this.updateNews();
    // }
    // handlePrev = async () => {
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.apiKey}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pagesize=${this.props.pagesize}`;
    //     this.setState({ loading: true })
    //     let data = await fetch(url);
    //     let parseData = await data.json();
    //     this.setState({
    //         page: this.state.page - 1,
    //         articles: parseData.articles,
    //         loading: false
    //     })
    //     this.setState({ page: this.statepage - 1 })
    //     this.updateNews();
    // }
    async componentDidMount() {

        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.apiKey}&apiKey=${this.props.apiKey}&pagesize=${this.props.pagesize}`;
        // this.setState({ loading: true })
        // let data = await fetch(url);
        // let parseData = await data.json();
        // console.log(parseData);
        // this.setState({
        //     articles: parseData.articles,
        //     totalArticles: parseData.totalResults,
        //     loading: false
        // })
        this.updateNews();

    }
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pagesize=${this.props.pagesize}`;

        let data = await fetch(url);
        let parseData = await data.json();
        console.log(parseData);
        this.setState({
            articles: this.state.articles.concat(parseData.articles),
            totalArticles: parseData.totalResults

        })
    };
    render() {
        return (
            <>
                <h2 className="my-4 text-center">NewsMan - Top {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} Headlines</h2>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length < this.state.totalArticles}
                    // hasMore={this.state.page + 1 < Math.ceil(this.state.totalArticles / this.props.pagesize)}
                    loader={<Spinner />}
                >
                    <div className='container my-3 mx-auto' style={{ width: "auto" }}>
                        <div className="row">
                            {this.state.articles.map((element, index) => {
                                return <div className="col-md-3" key={index}>
                                    <Newsitem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} newsUrl={element.url} imgUrl={element.urlToImage} author={element.author ? element.author : "sources"} publishedAt={element.publishedAt ? element.publishedAt : ""} source={element.source.name ? element.source.name : ""} />
                                </div>

                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button type="button " disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrev}>&larr; Previous</button>
                    <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalArticles / this.props.pagesize)} className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
                </div> */}
            </>
        )
    }
}

export default Newscomp

