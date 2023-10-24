import React, { useEffect, useState } from 'react'
import { CommentaryType } from '../constants';
import { UserType, useUserContext } from '../contexts/UserContext';
import { Console } from 'console';

type CommentProps = {
    placeId: string;
}

export default function Comments(props: CommentProps) {

    const [commentaries, setCommentaries] = useState<CommentaryType[]>([]);
    const [newComment, setNewComment] = useState<string>("");
    const { user } = useUserContext();
    const { placeId } = props;

    useEffect(() => {
        // fetch commentaries
        console.log("Fetch commentaries by placeId:");
        console.log(props.placeId);
        console.log(user.token);

        if (placeId) {
            fetch(`http://localhost:8000/api/comments?placeId=${placeId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
                .then(res => res.json())
                .then((data: CommentaryType[]) => { console.log(data); setCommentaries(data.map(comment => ({ ...comment, datePosted: new Date(comment.datePosted) }))) })
                .catch(err => { console.log(err); return "Err" });
        }
    }, [user])

    function handlePostNewComment() {
        if (newComment === "") {
            alert("Can't post an empty comment");
            return;
        }

        const newCommentObj = {
            "placeId": placeId,
            "commentMsg": newComment,
            "datePosted": new Date(),
            "user": {
                "userId": user.id,
                "username": user.username,
                "profilePhoto": user.profilePhoto
            }
        };

        fetch(`http://localhost:8000/api/comments/`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCommentObj)
        })
            .then(res => res.json())
            .then((data: CommentaryType) => {
                console.log(data); setCommentaries(
                    [...commentaries, { _id: data._id, ...newCommentObj }]
                )
            })
            .catch(err => { console.log(err); return "Err" });

        setNewComment("");
    }

    function formatDate(date: Date) {
        return `${date.getDate()}-${date.getMonth()} ${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`;
    }

    useEffect(() => {
        console.log(user)
    }, [commentaries])

    return (
        <div className='flex flex-col'>
            <textarea className='text-black' value={newComment} onChange={e => setNewComment(e.target.value)} placeholder='Write a review or a question about the place'></textarea>
            <button className='bg-blue-500' onClick={handlePostNewComment}>Post</button>
            <div className='text-red-900'>
                {commentaries.sort((commentPostA, commentPostB) =>
                    Number(commentPostB.datePosted) - Number(commentPostA.datePosted))
                    .map(commentPost =>
                        <div className='bg-slate-300 mb-5' key={commentPost._id}>
                            <img src={require(`../img/${commentPost.user.profilePhoto}`)} width={50} height={50} />
                            <p>{commentPost.user.username}</p>
                            <p >{commentPost.commentMsg}</p>
                            <p>{`Posted at: ${formatDate(commentPost.datePosted)}`}</p>
                        </div>)}
            </div>
        </div>
    )
}
