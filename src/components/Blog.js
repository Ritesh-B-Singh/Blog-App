import '../App.css';
import { Box, Grid, Typography, IconButton, Tooltip, Paper, Modal, Backdrop } from '@mui/material'
import NavBar from './NavBar';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useEffect, useState } from 'react';
import Editor from './Editor';

const ScrollbarStyle = {
    '&::-webkit-scrollbar': {
        width: '0.6em'
    },
    '&::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.2)',
        borderRadius: '28px'
    }
}

const options = {
    timeZone: 'UTC',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
};

const Blog = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [blogInfo, setBlogInfo] = useState()
    const [state, setState] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const onSuccess = () => {
        handleClose()
        setState(!state)
    }

    useEffect(() => {
        const getBlogData = async () => {
            setIsLoading(true)
            try {
                await fetch(`http://localhost:4000/`)
                    .then(response => {
                        response.json().then(blog => setBlogInfo(blog[0]));
                    });
            } catch (err) {
                console.log(err)
            }
            setIsLoading(false)
        }
        getBlogData()
    }, [state]);

    const date = new Date(blogInfo?.updatedAt);
    const formattedDateStr = date.toLocaleDateString('en-GB', options);

    return (
        <>
            {isLoading ?
                <Typography
                    style={{
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        color: '#555',
                        position: 'relative',
                        animation: 'fade-in 1s ease-in-out infinite alternate',
                    }}
                >
                    Loading...
                </Typography>
                :
                <Grid sx={{ height: '99.7vh', overflow: 'hidden' }} container columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={4} p={'3rem 0'} sm={4} md={7}>
                        <Box gap={2} sx={{ position: 'relative' }}>
                            <NavBar />
                            <Paper elevation={2} style={{ position: 'absolute', bottom: '20px', right: '20px', backgroundColor: '#fff', borderRadius: '50%' }}>
                                <Tooltip title="Edit">
                                    <IconButton onClick={handleOpen} style={{ padding: '10px', borderRadius: '50%', border: 'none', outline: 'none' }} sx={{
                                        '&:hover': {
                                            backgroundColor: '#fff',
                                            boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)'
                                        }
                                    }} >
                                        <BorderColorIcon style={{ color: '#333', fontSize: '24px' }} />
                                    </IconButton>
                                </Tooltip>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    closeAfterTransition
                                    slots={{ backdrop: Backdrop }}
                                    slotProps={{
                                        backdrop: {
                                            timeout: 500,
                                        },
                                    }}>
                                    <Editor blogInfo={blogInfo} onSuccess={onSuccess} />
                                </Modal>
                            </Paper>
                            <Box p={'0 5rem'} sx={ScrollbarStyle} style={{ height: '79vh', overflow: 'auto' }}>
                                <Box gap={2} p={2}>
                                    <Typography sx={{
                                        fontFamily: 'Kanit, sans-serif', fontWeight: '600', color: '#313141'
                                    }} variant='h3'>{blogInfo?.title}</Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', p: '1rem 0', fontFamily: 'Kanit, sans-serif' }}>
                                        <Typography sx={{ fontFamily: 'Kanit, sans-serif', fontWeight: '600', color: '#40d0cf' }} >~ {blogInfo?.author}</Typography>
                                        <Typography sx={{ fontFamily: 'Kanit, sans-serif', fontWeight: '600', color: '#c2c8cc' }} >{formattedDateStr}</Typography>
                                    </Box>
                                    <Typography sx={{
                                        background: '#F4F4F4',
                                        borderLeft: '5px solid #d3706d',
                                        margin: '1.5em 0',
                                        padding: '0.5em 10px',
                                        color: '#365363',
                                        fontStyle: 'italic',
                                        fontFamily: 'Helvetica Neue, sans-serif',
                                        fontWeight: 'bold',
                                        fontSize: '1em',
                                        lineHeight: '1.5',
                                        boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
                                        borderRadius: '4px'
                                    }}>
                                        {blogInfo?.quote}
                                    </Typography>

                                    <Typography sx={{ fontFamily: 'Kanit, sans-serif', fontWeight: 600, color: '#3e585b' }} dangerouslySetInnerHTML={{ __html: blogInfo?.content }} variant='body1'></Typography>

                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={2} sm={4} md={5} style={{ height: '100%' }}>
                        <img style={{ maxHeight: '100%', objectFit: 'cover' }} src={blogInfo?.imageUrl} alt={blogInfo?.title} />
                    </Grid>

                </Grid>}
        </>
    )
}

export default Blog