import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { CommentDeleteUpdate, DeleteCommentModalOpen, ErrorModalOpen, SnackBarOpen } from '../../../../../services/Reducers/UserReducer';
import { Stack } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import { delete_comment } from '../../../../../services/Api/userPost/postsApi';
import { SnackBarMessage } from '../../../../../services/Reducers/UserDataReducer';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'rgb(225,225,225,)',
  border: '2px solid #000',
  boxShadow: 24,
};

export default function BasicModal(commentID: any) {
  const isDeletePostOpen = useSelector((state: any) => state.user.value.isDeleteCommentModalOpen);
 const isCommentDeleteUpdate = useSelector((state:any) => state.user.value.isCommentUpdate)
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(DeleteCommentModalOpen(false))
  };

  // DELETING THE POST //

  const handleDeletePost = async () => {
  try {
    const deleteCommentRespone = await delete_comment(commentID?.currentCommentId)
    dispatch(CommentDeleteUpdate(!isCommentDeleteUpdate))
    dispatch(SnackBarMessage('comment deleted'))
    dispatch(SnackBarOpen(true))
    if(deleteCommentRespone?.msg){
      dispatch(DeleteCommentModalOpen(false))
    }
  } catch (error) {
    dispatch(ErrorModalOpen(true))
  }
  }

  return (
    <div>
      <Modal
        open={isDeletePostOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ bgcolor: 'black', width: '100%', height: '30vh' }}>
            <Box sx={{ bgcolor: 'rgba(225,225,225,0.10)', width: '100%', height: '30vh', p: 4 }}>
              <Typography sx={{ color: '#FFFFFF' }} id="modal-modal-title" variant="h6" component="h2">
                Dlete This comment
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2, color: '#FFFFFF' }}>
                Are you sure
              </Typography>
              <Box sx={{ pt: 2 }}>
                <Stack display='flex' direction='row' spacing={3}>
                  <Box>
                    <Button variant="outlined" onClick={() => dispatch(DeleteCommentModalOpen(false))} >
                      Cancel
                    </Button>
                  </Box>
                  <Box>
                    <Button variant="outlined" color="error" onClick={handleDeletePost} startIcon={<DeleteIcon />}>
                      Delete
                    </Button>
                  </Box>
                </Stack>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}