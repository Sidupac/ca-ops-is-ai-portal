import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { demoChats, demoFolders, bots } from '../config';
import {
  FaFolder,
  FaFolderOpen,
  FaPlus,
  FaEllipsisV,
  FaSearch,
  FaBars,
  FaTimes,
  FaAngleDown,
  FaAngleUp,
  FaCheck,
  FaTrash,
  FaPencilAlt,
} from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

const Sidebar = ({ onSelectChat }) => {
  const [folders, setFolders] = useState(demoFolders);
  const [chats, setChats] = useState(demoChats);
  const [selectedFolder, setSelectedFolder] = useState('All');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isFoldersHidden, setIsFoldersHidden] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFolderOptions, setShowFolderOptions] = useState(null);
  const [showChatOptions, setShowChatOptions] = useState(null);
  const [folderInEditMode, setFolderInEditMode] = useState(null);
  const [folderToDelete, setFolderToDelete] = useState(null);
  const [chatToDelete, setChatToDelete] = useState(null);

  const colorPalette = [
    '#FF0000',
    '#FFA500',
    '#FFFF00',
    '#008000',
    '#0000FF',
    '#4B0082',
    '#EE82EE',
  ];

  useEffect(() => {
    // Auto-delete chats with no user interaction
    const unusedChats = chats.filter((chat) => !chat.hasInteraction);
    if (unusedChats.length > 0) {
      setChats((prevChats) => prevChats.filter((chat) => chat.hasInteraction));
    }
  }, [chats]);

  const handleToggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleToggleFolders = () => {
    setIsFoldersHidden(!isFoldersHidden);
  };

  const handleCreateFolder = () => {
    const newFolder = { id: uuidv4(), name: '', color: '#FFFFFF' };
    setFolders([...folders, newFolder]);
    setFolderInEditMode(newFolder.id);
  };

  const handleFolderNameChange = (e, folderId) => {
    const newName = e.target.value;
    setFolders(
      folders.map((f) => (f.id === folderId ? { ...f, name: newName } : f))
    );
  };

  const handleFolderNameBlur = (folderId) => {
    const folder = folders.find((f) => f.id === folderId);
    if (!folder.name.trim()) {
      // Remove folder if name is empty
      setFolders(folders.filter((f) => f.id !== folderId));
    }
    setFolderInEditMode(null);
  };

  const handleRenameFolder = (folderId) => {
    setFolderInEditMode(folderId);
    setShowFolderOptions(null); // Close options menu
  };

  const handleDeleteFolder = (folderId) => {
    const folderChats = chats.filter((chat) => chat.folderId === folderId);
    if (folderChats.length > 0) {
      alert('Folder is not empty. Please move or delete all chats before deleting the folder.');
      setShowFolderOptions(null);
      return;
    }
    setFolderToDelete(folderId);
    setShowFolderOptions(null); // Close options menu
  };

  const confirmDeleteFolder = (confirm) => {
    if (confirm) {
      setFolders(folders.filter((f) => f.id !== folderToDelete));
    }
    setFolderToDelete(null);
  };

  const handleFolderOptions = (e, folderId) => {
    e.stopPropagation();
    if (showFolderOptions === folderId) {
      setShowFolderOptions(null);
    } else {
      setShowFolderOptions(folderId);
    }
  };

  const handleChangeFolderColor = (folderId, color) => {
    setFolders(
      folders.map((f) => (f.id === folderId ? { ...f, color } : f))
    );
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const handleChatOptions = (e, chatId) => {
    e.stopPropagation();
    if (showChatOptions === chatId) {
      setShowChatOptions(null);
    } else {
      setShowChatOptions(chatId);
    }
  };

  const handleDeleteChat = (chatId) => {
    setChatToDelete(chatId);
    setShowChatOptions(null);
  };

  const confirmDeleteChat = (confirm) => {
    if (confirm) {
      setChats(chats.filter((c) => c.id !== chatToDelete));
    }
    setChatToDelete(null);
  };

  const handleMoveChat = (chatId) => {
    // Implement move chat functionality
    setShowChatOptions(null);
  };

  // Adjusted chat filtering to use folderId
  const filteredChats = chats.filter((chat) => {
    const inFolder =
      selectedFolder === 'All' || chat.folderId === selectedFolder;
    const matchesSearch = chat.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return inFolder && matchesSearch;
  });

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="top-icons">
          <button className="icon-button" onClick={handleToggleSidebar}>
            <FaBars />
          </button>
          <button className="icon-button" onClick={handleToggleFolders}>
            {isFoldersHidden ? <FaAngleDown /> : <FaAngleUp />}
          </button>
        </div>
        {!isCollapsed && !isFoldersHidden && (
          <>
            <ul className="folder-list">
              <li
                className={`folder-item ${
                  selectedFolder === 'All' ? 'active' : ''
                }`}
                onClick={() => setSelectedFolder('All')}
              >
                <FaFolderOpen /> All
              </li>
              {folders.map((folder) => (
                <li
                  key={folder.id}
                  className={`folder-item ${
                    selectedFolder === folder.id ? 'active' : ''
                  }`}
                  onClick={() => setSelectedFolder(folder.id)}
                >
                  <FaFolder style={{ color: folder.color }} />
                  {folderInEditMode === folder.id ? (
                    <input
                      type="text"
                      value={folder.name}
                      autoFocus
                      onChange={(e) => handleFolderNameChange(e, folder.id)}
                      onBlur={() => handleFolderNameBlur(folder.id)}
                      onClick={(e) => e.stopPropagation()}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleFolderNameBlur(folder.id);
                        }
                      }}
                    />
                  ) : (
                    folder.name
                  )}
                  {folderToDelete === folder.id ? (
                    <div className="folder-delete-confirm">
                      <FaCheck
                        onClick={() => confirmDeleteFolder(true)}
                        title="Confirm Delete"
                      />
                      <FaTimes
                        onClick={() => confirmDeleteFolder(false)}
                        title="Cancel Delete"
                      />
                    </div>
                  ) : (
                    <div className="folder-options">
                      <FaEllipsisV
                        onClick={(e) => handleFolderOptions(e, folder.id)}
                      />
                      {showFolderOptions === folder.id && (
                        <div className="options-menu">
                          <div
                            className="options-item"
                            onClick={() => handleRenameFolder(folder.id)}
                          >
                            <FaPencilAlt /> Rename
                          </div>
                          <div
                            className="options-item"
                            onClick={() => handleDeleteFolder(folder.id)}
                          >
                            <FaTrash /> Delete
                          </div>
                          <div className="color-palette">
                            {colorPalette.map((color) => (
                              <span
                                key={color}
                                className="color-swatch"
                                style={{ backgroundColor: color }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleChangeFolderColor(folder.id, color);
                                }}
                              ></span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </li>
              ))}
              <li className="folder-item create-folder" onClick={handleCreateFolder}>
                <FaPlus /> New Folder
              </li>
            </ul>
          </>
        )}

        {!isCollapsed && (
          <>
            <div className="search-bar">
              <FaSearch />
              <input
                type="text"
                placeholder="Search chats..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {searchQuery && (
                <FaTimes className="clear-search" onClick={clearSearch} />
              )}
            </div>

            <ul className="chat-list">
              {filteredChats.length > 0 ? (
                filteredChats.map((chat) => (
                  <li
                    key={chat.id}
                    className="chat-item"
                    onClick={() => onSelectChat(chat.botType, chat.name)}
                  >
                    <span className="chat-icon">
                      {bots.find((bot) => bot.urlname === chat.botType)?.icon ||
                        '🤖'}
                    </span>
                    {chat.name}
                    {chatToDelete === chat.id ? (
                      <div className="chat-delete-confirm">
                        <FaCheck
                          onClick={() => confirmDeleteChat(true)}
                          title="Confirm Delete"
                        />
                        <FaTimes
                          onClick={() => confirmDeleteChat(false)}
                          title="Cancel Delete"
                        />
                      </div>
                    ) : (
                      <div className="chat-options">
                        <FaEllipsisV
                          onClick={(e) => handleChatOptions(e, chat.id)}
                        />
                        {showChatOptions === chat.id && (
                          <div className="options-menu">
                            <div
                              className="options-item"
                              onClick={() => handleDeleteChat(chat.id)}
                            >
                              <FaTrash /> Delete
                            </div>
                            <div
                              className="options-item"
                              onClick={() => handleMoveChat(chat.id)}
                            >
                              <FaFolder /> Move
                            </div>
                            {/* Add edit and color-coding options here */}
                          </div>
                        )}
                      </div>
                    )}
                  </li>
                ))
              ) : (
                <li className="no-chats">No chats yet</li>
              )}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
