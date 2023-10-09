import React, { useContext, useEffect, useState } from 'react';
import { context } from '../App';
import { Circles } from 'react-loader-spinner';
import Stack from '@mui/material/Stack';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import Button from '@mui/material/Button';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import TextField from '@mui/material/TextField';
import CommentIcon from '@mui/icons-material/Comment';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import "./Style.css";


const Video = () => {

    const { Data, setData } = useContext(context);
    const [loader, setLoader] = useState(false);
    const [page, setPage] = useState(0);
    const [like, setLike] = useState(0);
    const [comment, setComment] = useState(false);
    const [commentData, setCommentData] = useState("");

    const sendComment = (e, item) => {
        let code = e.keyCode || e.which;
        if (code === 13) {
            if (commentData) {
                setCommentData(item.comment.count = item.comment.count + 1);
                setCommentData("")
                alert("Comment added successfully")
            }
        }
    }
    const commentHandle = (item) => {
        item.comment.commentingAllowed = !item.comment.commentingAllowed
        setComment(item.comment.commentingAllowed)
    }
    const likeHandle = (item) => {
        console.log(item.reaction.count, "item");
        if (!item.reaction.voted) {

            setLike(item.reaction.count = item.reaction.count + 1);
            item.reaction.voted = true;
        }

    }
    const disLikeHandle = (item) => {
        console.log(item.reaction.count, "item");
        if (item.reaction.voted) {
            setLike(item.reaction.count = item.reaction.count - 1);
            item.reaction.voted = false;
        }

    }

    const previousHandleVideo = () => {
        if (page === 0) {
            // alert("No Previous Page")
            setPage(0)
        } else {
            setPage((page) => page - 1)
        }
    }
    const nextHandleVideo = () => {
        if (page === 9) {
            alert("No more Data");
            setPage(page)
        } else {
            setPage((page) => page + 1)
        }
    }

    useEffect(() => {
        getData();
    }, [page])



    const getData = async () => {
        try {
            setLoader(true)
            const response = await fetch(`https://internship-service.onrender.com/videos?page=${page}`);
            const result = await response.json();

            setData(result.data.posts)
            setLoader(false)


        } catch (error) {
            console.log(error);
        }
    }

    if (loader) {
        return <div className='Loader'>
            <Circles
                height="80"
                width="80"
                color="purple"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    }
    return (
        <div >
            <div className='main_container'>
                {Data.length > 0 && Data.map((item) => {
                    return <div className='Video-card' key={item.postId}>
                        <div className="video-box">
                            <video controls preload="none" loop poster={item.submission.thumbnail}>
                                <source src={item.submission.mediaUrl} type="video/mp4"></source>
                            </video>
                        </div>
                        <div className='video-content-box'>
                            <div>
                                <h3>{item.creator.name || item.creator.handle} </h3>
                                <span >
                                    <span style={{ fontSize: "15px" }}><sup>{item.reaction.count} </sup> </span>
                                    <ThumbUpOffAltIcon onClick={() => likeHandle(item)} style={{ cursor: "pointer", fontSize: "25px" }} className={item.reaction.voted && "LikeFillColor"} />
                                    <ThumbDownOffAltIcon style={{ cursor: "pointer", fontSize: "25px" }} onClick={() => disLikeHandle(item)} />
                                </span>

                            </div>
                            <h5>{item.submission.title}</h5>
                            <h6>{item.submission.description.slice(0, 120)}.</h6>
                            <CommentIcon style={{ cursor: "pointer" }} onClick={() => commentHandle(item)} /><sup>{item.comment.count}</sup>{!item.comment.commentingAllowed &&
                                <TextField id="standard-basic" label="comment" variant="standard" value={commentData} onKeyPress={(e) => sendComment(e, item)} onChange={(e) => setCommentData(e.target.value)} />}
                        </div>
                    </div>
                })}
            </div>
            <Stack spacing={2} direction="row" className='btn'>

                <Button variant="contained" style={{ background: "purple" }} onClick={previousHandleVideo}>Previous</Button>
                <Button variant="contained" style={{ background: "purple" }} onClick={nextHandleVideo}>Next</Button>

            </Stack>

            <footer>
                <div className="icon-box">
                    <FacebookOutlinedIcon />
                </div>
                <div className="icon-box">
                    <InstagramIcon />
                </div>
                <div className="icon-box">
                    <TwitterIcon />
                </div>
                <div className="icon-box">
                    <YouTubeIcon />
                </div>
            </footer>

        </div>
    )
}

export default Video