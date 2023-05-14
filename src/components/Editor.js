import React, { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 6,
};

const modules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
        ['link', 'image'],
        ['clean'],
    ],
};

const Editor = ({ blogInfo, onSuccess }) => {
    const [content, setContent] = useState(blogInfo.content)
    const [title, setTitle] = useState(blogInfo.title)
    const [imageUrl, setImageUrl] = useState(blogInfo.imageUrl)
    const [author, setAuthor] = useState(blogInfo.author)
    const [quote, setQuote] = useState(blogInfo.quote)

    const handleSubmit = async () => {
        try {
            const response = await fetch('https://blog-app-backend-bay.vercel.app/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: blogInfo._id, content, title, imageUrl, author, quote })
            });
            if (response.status === 200) {
                onSuccess();
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Box style={style} sx={{
            backgroundColor: '#fff',
            padding: '25px',
            borderRadius: '10px',
            maxHeight: '600px',
            overflow: 'auto',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
            '& h1': {
                textAlign: 'center',
                marginBottom: '20px',
                color: '#333'
            },
            '& .MuiFormControl-root': {
                marginBottom: '20px'
            },
            '& .MuiButton-contained': {
                backgroundColor: '#d3706d',
                color: '#fff',
                '&:hover': {
                    backgroundColor: '#c65e58'
                }
            }
        }}>
            <Typography sx={{
                fontFamily: 'Kanit, sans-serif', fontWeight: '600', color: '#313141', textAlign: 'center',
                marginBottom: '20px'
            }} variant='h4'>Edit Blog</Typography>
            <TextField
                label='Title'
                value={title}
                size='small'
                sx={{ fontFamily: 'Kanit, sans-serif' }}
                onChange={e => setTitle(e.target.value)}
                variant="outlined"
                fullWidth
            />
            <TextField
                label='Image Url'
                value={imageUrl}
                sx={{ fontFamily: 'Kanit, sans-serif' }}
                size='small'
                onChange={e => setImageUrl(e.target.value)}
                variant="outlined"
                fullWidth
            />
            <TextField
                label='Author'
                size='small'
                value={author}
                sx={{ fontFamily: 'Kanit, sans-serif' }}
                onChange={e => setAuthor(e.target.value)}
                variant="outlined"
                fullWidth
            />
            <TextField
                label='Quote'
                value={quote}
                size='small'
                sx={{ fontFamily: 'Kanit, sans-serif' }}
                onChange={e => setQuote(e.target.value)}
                variant="outlined"
                fullWidth
            />
            <ReactQuill
                value={content}
                theme={'snow'}
                onChange={newValue => setContent(newValue)}
                modules={modules}
            />
            <Box display={'flex'} justifyContent={'center'} width={'100%'} >
                <Button
                    variant='contained'
                    sx={{ mt: 3, fontWeight: 600, fontFamily: 'Kanit, sans-serif' }}
                    size='small'
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </Box>
        </Box>
    )
}

export default Editor