import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null // selectedPostId pt1
    }

    componentDidMount () {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                const posts = response.data.slice(0, 4); // fetching only 4 posts
                const updatedPosts = posts.map(post => { // updating posts and transformation
                    return {
                        ...post,
                        author: 'Abel'
                    }
                })
                this.setState({posts: updatedPosts});
                // this.setState({posts: response.data}); // 1st code
                //console.log(response);
                
            });
    };

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id}); // selectedPostId pt2
    }

    render () {
        const posts = this.state.posts.map(post => {
           return <Post 
            key={post.id} 
            title={post.title} 
            author={post.author}
            clicked={() => this.postSelectedHandler(post.id)} // method passes id to handler 
           />;
        });

        // selectedPostId pt3 in fullpost
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;