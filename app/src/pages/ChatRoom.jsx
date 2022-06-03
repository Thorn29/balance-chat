import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import socket from '../socket';
import UserContext from '../context/usercontext';
import Loader from '../components/layout/Loader';
import ActiveDock from '../components/chat/ActiveDock';
import WritingBox from '../components/chat/WritingBox';
import MessageList from '../components/chat/MessageList';
import './ChatRoom.css';

const ChatRoom = ({ match }) => {

  const [ loading, setLoading ] = useState(true);
  const [ roomData, setRoomData ] = useState(null);
  const [ activeUsers, setActiveUsers ] = useState([]);
  const [ messages, setMessages ] = useState([]);
  const { user } = useContext(UserContext);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {

    if (!user.username) {
      navigate('/login');
    }

    socket.emit('join', { username: user.username, room: params.id, dbId: user._id });

    socket.on('joined', (data) => {
      setRoomData(data.room);
      setActiveUsers(data.online);
      setLoading(false);
    });

    socket.on('no_room', () => navigate('/main'));

    socket.on('new_user', (online) => setActiveUsers(online));
    socket.on('message', (message) => {
      setMessages(messages => [...messages, message]);
    });
    socket.on('user_left', (online) => setActiveUsers(online));

    return () => {
      socket.emit('leave');
      socket.removeAllListeners();
    }
  }, [params.id, user.username, user.id, navigate]);

    if (loading) return <Loader />;
    return(
    <div className='chat-room'>
      <ActiveDock users={activeUsers} room={roomData} admin={user._id === roomData.author._id} />
      <div className='chat-room__chat'>
      <MessageList messages={messages} />
      <WritingBox />
      </div>
    </div>
  )
}

export default ChatRoom;
