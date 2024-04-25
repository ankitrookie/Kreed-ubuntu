export const data = [
    {
        id: 1,
        userName: 'Priti Mondal',
        imageUrl: require('../assets/images/userimage.png'),
        date: 'June 2, 2023',
        profile: require('../assets/images/profile.png'),
        description:
            'The lorem ipsum text is usually a section of a Latin text by Cicero with words altered, added and removed to make it nonsensical. Lorem ipsum text is used in mock-ups of visual design projects before the actual words are.',
        likes: 102000,
        comments: 12000,
        shaimages: 1000,
    },
]

export const ProfileData = [
    {
        type: 'image',
        source: require('../assets/images/download.jpg'),
    },
    {
        type: 'userInfo',
        username: 'Ankit',
        postCount: 80,
        followersCount: '12k',
        followingCount: 30,
        description:
            'Ankit, skilled badminton player with agility, precision, and passion. Dedicated to excellence on the court, aiming to achieve new heights in the world of badminton with unwavering determination.',
    },
    {
        type: 'buttons',
        buttons: [
            { text: 'Edit Profile', action: 'goto' },
            { text: 'Share Profile', action: 'handleShare' },
        ],
    },
    {
        type: 'navigation',
        tabs: [
            { text: 'Post', action: 'setPost' },
            { text: 'Status', action: 'setCreate' },
            { text: 'History', action: 'setHistory' },
        ],
    },
    {
        type: 'history',
        items: [
            {
                username: 'Ankit',
                activity: 'played badminton with Parth and 3 others.',
                date: 'june 2 2023',
                image: require('../assets/images/download.jpg'),
            },
            // Add more history items here...
        ],
    },
    // Add more sections as needed...
];

export const messages = [
    {
        id: 1,
        avatar: require('../assets/images/saina.png'),
        name: 'Priti Modal',
        timestamp: `${new Date(Date.now()).toLocaleString().slice(11, 16)}${new Date(Date.now()).toLocaleString().slice(19, 22)}`,
        hasRead: true,
    },
    {
        id: 2,
        avatar: require('../assets/images/saina.png'),
        name: 'Priti Modal',
        timestamp: `${new Date(Date.now()).toLocaleString().slice(11, 16)}${new Date(Date.now()).toLocaleString().slice(19, 22)}`,
        hasRead: true,
    },
    {
        id: 3,
        avatar: require('../assets/images/saina.png'),
        name: 'Priti Modal',
        timestamp: `${new Date(Date.now()).toLocaleString().slice(11, 16)}${new Date(Date.now()).toLocaleString().slice(19, 22)}`,
        hasRead: true,
    },
    {
        id: 4,
        avatar: require('../assets/images/saina.png'),
        name: 'Priti Modal',
        timestamp: `${new Date(Date.now()).toLocaleString().slice(11, 16)}${new Date(Date.now()).toLocaleString().slice(19, 22)}`,
        hasRead: true,
    },
    {
        id: 5,
        avatar: require('../assets/images/saina.png'),
        name: 'Priti Modal',
        timestamp: `${new Date(Date.now()).toLocaleString().slice(11, 16)}${new Date(Date.now()).toLocaleString().slice(19, 22)}`,
        hasRead: true,
    },
    {
        id: 6,
        avatar: require('../assets/images/saina.png'),
        name: 'Priti Modal',
        timestamp: `${new Date(Date.now()).toLocaleString().slice(11, 16)}${new Date(Date.now()).toLocaleString().slice(19, 22)}`,
        hasRead: true,
    },
];


export const MemberListData = [
    { key: 'A', Name: 'PlayerName' },
    { key: 'B', Name: 'PlayerName' },
    { key: 'C', Name: 'PlayerName' },
    { key: 'D', Name: 'PlayerName' },
    { key: 'E', Name: 'PlayerName' },
    { key: 'F', Name: 'PlayerName' },
    { key: 'G', Name: 'PlayerName' },
    { key: 'H', Name: 'PlayerName' },
    { key: 'I', Name: 'PlayerName' },
    { key: 'J', Name: 'PlayerName' },
    { key: 'K', Name: 'PlayerName' },
    { key: 'L', Name: 'PlayerName' },
    { key: 'M', Name: 'PlayerName' },
    { key: 'N', Name: 'PlayerName' },
];




export const NotificationData = [
    {
        id: 1,
        image1: require('../assets/images/download1.png'),
        image2: require('../assets/images/profile.png'),
        dis: 'Siva123 and Hitasi66 are following Ravi111',
        followed: true
    },
    {
        id: 2,
        image1: require('../assets/images/download1.png'),
        dis: 'Gurub has played with Abu1289 and 6 others',
        followed: false
    },
    {
        id: 3,
        image1: require('../assets/images/download1.png'),
        image2: require('../assets/images/saina.png'),
        dis: 'Gurub has played with Abu1289 and 6 others',
        followed: false
    },
    {
        id: 4,
        image1: require('../assets/images/download1.png'),
        image2: require('../assets/images/download1.png'),
        dis: 'Gurub has played with Abu1289 and 6 others',
        followed: true
    },
    {
        id: 5,
        image1: require('../assets/images/download1.png'),
        image2: require('../assets/images/download1.png'),
        dis: 'Gurub has played with Abu1289 and 6 others',
        followed: false
    },
    {
        id: 6,
        image1: require('../assets/images/download1.png'),
        image2: require('../assets/images/download1.png'),
        dis: 'Gurub has played with Abu1289 and 6 others',
        followed: true
    },
    {
        id: 7,
        image1: require('../assets/images/download1.png'),
        image2: require('../assets/images/download1.png'),
        dis: 'Gurub has played with Abu1289 and 6 others',
        followed: false
    },
];



export const HistoryData = [
    {
        id: 1,
        "View1": {
            "Image1": {
                "source": require('../assets/images/userimage.png')
            },
            "Image2": {
                "source": require('../assets/images/userimage.png')
            }
        },
        "View2": {
            "Text1": {
                "content": "10"
            },
            "Text2": {
                "content": "vs"
            },
            "Text3": {
                "content": "5"
            }
        },
        "View3": {
            "Image1": {
                "source": require('../assets/images/download1.png')
            },
            "Image2": {
                "source": require('../assets/images/download1.png')
            }
        },
    },
    {
        id: 2,
        "View1": {
            "Image1": {
                "source": require('../assets/images/userimage.png')
            },
            "Image2": {
                "source": require('../assets/images/userimage.png')
            }
        },
        "View2": {
            "Text1": {
                "content": "10"
            },
            "Text2": {
                "content": "vs"
            },
            "Text3": {
                "content": "5"
            }
        },
        "View3": {
            "Image1": {
                "source": require('../assets/images/download1.png')
            },
            "Image2": {
                "source": require('../assets/images/download1.png')
            }
        }
    },
    {
        id: 3,
        "View1": {
            "Image1": {
                "source": require('../assets/images/userimage.png')
            },
            "Image2": {
                "source": require('../assets/images/userimage.png')
            }
        },
        "View2": {
            "Text1": {
                "content": "10"
            },
            "Text2": {
                "content": "vs"
            },
            "Text3": {
                "content": "5"
            }
        },
        "View3": {
            "Image1": {
                "source": require('../assets/images/download1.png')
            },
            "Image2": {
                "source": require('../assets/images/download1.png')
            }
        }
    },
    {
        id: 4,
        "View1": {
            "Image1": {
                "source": require('../assets/images/userimage.png')
            },
            "Image2": {
                "source": require('../assets/images/userimage.png')
            }
        },
        "View2": {
            "Text1": {
                "content": "10"
            },
            "Text2": {
                "content": "vs"
            },
            "Text3": {
                "content": "5"
            }
        },
        "View3": {
            "Image1": {
                "source": require('../assets/images/download1.png')
            },
            "Image2": {
                "source": require('../assets/images/download1.png')
            }
        }
    },
    {
        id: 5,
        "View1": {
            "Image1": {
                "source": require('../assets/images/userimage.png')
            },
            "Image2": {
                "source": require('../assets/images/userimage.png')
            }
        },
        "View2": {
            "Text1": {
                "content": "10"
            },
            "Text2": {
                "content": "vs"
            },
            "Text3": {
                "content": "5"
            }
        },
        "View3": {
            "Image1": {
                "source": require('../assets/images/download1.png')
            },
            "Image2": {
                "source": require('../assets/images/download1.png')
            }
        }
    },
    {
        id: 6,
        "View1": {
            "Image1": {
                "source": require('../assets/images/userimage.png')
            },
            "Image2": {
                "source": require('../assets/images/userimage.png')
            }
        },
        "View2": {
            "Text1": {
                "content": "10"
            },
            "Text2": {
                "content": "vs"
            },
            "Text3": {
                "content": "5"
            }
        },
        "View3": {
            "Image1": {
                "source": require('../assets/images/download1.png')
            },
            "Image2": {
                "source": require('../assets/images/download1.png')
            }
        }
    },
];


export const RecentSearchList = [
    {
        "id": 1,
        "name": "Akash Datta",
        "username": "Akash_334",
        "status": "Following",
        "imageSource": require("../assets/images/download1.png")
    },
    {
        "id": 2,
        "name": "Akash Datta",
        "username": "Akash_334",
        "status": "Following",
        "imageSource": require("../assets/images/download1.png")
    },
    {
        "id": 3,
        "name": "Akash Datta",
        "username": "Akash_334",
        "status": "Following",
        "imageSource": require("../assets/images/download1.png")
    },
    {
        "id": 4,
        "name": "Akash Datta",
        "username": "Akash_334",
        "status": "Following",
        "imageSource": require("../assets/images/download1.png")
    }
];

export const commentsData = [
    {
        "id": 1,
        "imageSource": require("../assets/images/saina.png"),
        'name': 'Liza1233',
        "commentCount": 1,
        "commentsLike": 105
    },
    {
        "id": 2,
        "imageSource": require("../assets/images/saina.png"),
        'name': 'R_oh_it_1344',
        "commentCount": 1,
        "commentsLike": 105
    },
    {
        "id": 3,
        "imageSource": require("../assets/images/saina.png"),
        'name': 'Rai',
        "commentCount": 1,
        "commentsLike": 105
    },
    {
        "id": 4,
        "imageSource": require("../assets/images/saina.png"),
        'name': 'Ankit',
        "commentCount": 1,
        "commentsLike": 105
    },
    {
        "id": 5,
        "imageSource": require("../assets/images/saina.png"),
        'name': 'Ankit',
        "commentCount": 1,
        "commentsLike": 105
    },
    {
        "id": 6,
        "imageSource": require("../assets/images/saina.png"),
        'name': 'Ankit',
        "commentCount": 1,
        "commentsLike": 105
    },
    {
        "id": 7,
        "imageSource": require("../assets/images/saina.png"),
        'name': 'Ankit',
        "commentCount": 1,
        "commentsLike": 105
    },
];

export const scoreBoardData = [
    {
        "id": 1,
        "team1": {
            "name": "Team 1",
            "score": "104/3",
            "overs": "8 overs",
        },
        "team2": {
            "name": "Team 2",
            "score": "139/3",
            "overs": "8 overs"
        },
        "player1": {
            "imageSource": require("../assets/images/download1.png"),
            "stats": {
                "runs": "22(8)",
                "wickets": "1-14-1",
                "extras": "O R W"
            }
        },
        "player2": {
            "imageSource": require("../assets/images/emojione_sports-medal.png"),
            "mvp": true,
            "name": "Guru",
            "avatarSource": require("../assets/images/saina.png")
        }
    },
    {
        "id": 2,
        "team1": {
            "name": "Team 1",
            "score": "104/3",
            "overs": "8 overs",
        },
        "team2": {
            "name": "Team 2",
            "score": "139/3",
            "overs": "8 overs"
        },
        "player1": {
            "imageSource": require("../assets/images/download1.png"),
            "stats": {
                "runs": "22(8)",
                "wickets": "1-14-1",
                "extras": "O R W"
            }
        },
        "player2": {
            "imageSource": require("../assets/images/emojione_sports-medal.png"),
            "mvp": true,
            "name": "Guru",
            "avatarSource": require("../assets/images/saina.png")
        }
    },
    {
        "id": 3,
        "team1": {
            "name": "Team 1",
            "score": "104/3",
            "overs": "8 overs",
        },
        "team2": {
            "name": "Team 2",
            "score": "139/3",
            "overs": "8 overs"
        },
        "player1": {
            "imageSource": require("../assets/images/download1.png"),
            "stats": {
                "runs": "22(8)",
                "wickets": "1-14-1",
                "extras": "O R W"
            }
        },
        "player2": {
            "imageSource": require("../assets/images/emojione_sports-medal.png"),
            "mvp": true,
            "name": "Guru",
            "avatarSource": require("../assets/images/saina.png")
        }
    },
    {
        "id": 4,
        "team1": {
            "name": "Team 1",
            "score": "104/3",
            "overs": "8 overs",
        },
        "team2": {
            "name": "Team 2",
            "score": "139/3",
            "overs": "8 overs"
        },
        "player1": {
            "imageSource": require("../assets/images/download1.png"),
            "stats": {
                "runs": "22(8)",
                "wickets": "1-14-1",
                "extras": "O R W"
            }
        },
        "player2": {
            "imageSource": require("../assets/images/emojione_sports-medal.png"),
            "mvp": true,
            "name": "Guru",
            "avatarSource": require("../assets/images/saina.png")
        }
    },
    {
        "id": 5,
        "team1": {
            "name": "Team 1",
            "score": "104/3",
            "overs": "8 overs",
        },
        "team2": {
            "name": "Team 2",
            "score": "139/3",
            "overs": "8 overs"
        },
        "player1": {
            "imageSource": require("../assets/images/download1.png"),
            "stats": {
                "runs": "22(8)",
                "wickets": "1-14-1",
                "extras": "O R W"
            }
        },
        "player2": {
            "imageSource": require("../assets/images/emojione_sports-medal.png"),
            "mvp": true,
            "name": "Guru",
            "avatarSource": require("../assets/images/saina.png")
        }
    }
];

export const recordedVideo = [
    {
        id: 1,
        recordedVideo: require("../assets/images/videoImage.png")
    },
    {
        id: 2,
        recordedVideo: require("../assets/images/videoImage2.png")
    },
];
