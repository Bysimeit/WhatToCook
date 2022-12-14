import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Pressable, TextInput, Alert, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CheckBox from 'expo-checkbox';
import { IP_API } from '../services/config';

import useFetchFavorite from '../services/useFetchFavorite';
import useFetchComment from '../services/useFetchComment';

import { useDispatch, useSelector } from 'react-redux';
import { getFavorite } from '../redux/selectors';
import { getProfile } from '../redux/selectors';
import { getConnected } from "../redux/selectors";
import { deleteFavorite } from '../redux/actions/favoriteList';
import { addFavorite } from '../redux/actions/favoriteList';

export default function ComFavData({recipe}) {
    const recipeJSON = JSON.parse(recipe).data;

    const [isFavorite, setIsFavorite] = React.useState(false);
    const [disable, setDisable] = React.useState(true);
    const [commentList, setCommentList] = React.useState();

    const favoriteRedux = useSelector(getFavorite);
    const profileRedux = useSelector(getProfile);
    const dispatch = useDispatch();

    const { changeCustomerFavorite } = useFetchFavorite();
    const { fetchCommentRecipe, updateCommentRecipe, postCommentRecipe } = useFetchComment();

    const checkBoxInteract = () => {
        if (isFavorite) {
            dispatch(deleteFavorite(recipeJSON.id));
            changeCustomerFavorite(profileRedux[0].id, recipeJSON.id, false).then((result) => {
                if (result.status === 204) {
                    Alert.alert("Retiré !", "La recette a bien été supprimée dans vos favoris.");
                }
            }).catch((e) => {
                Alert.alert("Erreur !", e.message);
            });
            setIsFavorite(false);
        } else {
            dispatch(addFavorite(recipeJSON.id, recipeJSON.namerecipe, recipeJSON.time, recipeJSON.total, recipeJSON.quoting, `${IP_API}/upload/${recipeJSON.id}.jpeg`));
            changeCustomerFavorite(profileRedux[0].id, recipeJSON.id, true).then((result) => {
                if (result.status === 204) {
                    Alert.alert("Ajouté !", "La recette a bien été ajoutée dans vos favoris.");
                }
            }).catch((e) => {
                Alert.alert("Erreur !", e.message);
            });
            setIsFavorite(true);
        }
    }

    const commentShow = () => {
        if (commentList !== undefined) {
            if (commentList.length < 1 || commentList[0] === "Introuvable") {
                return `Il n'y a pas de commentaire pour cette recette.`;
            } else {
                let stringList = [];

                for (let i = 0; i < commentList.length; i++) {
                    if (commentList[i].comment !== null) {
                        stringList.push("- " + commentList[i].comment + "\n\n");
                    }
                }

                if (stringList.length === 0) {
                    stringList.push(`Il n'y a pas de commentaire pour cette recette.`);
                }

                return stringList;
            }
        }
    }

    useEffect(() => {
        setIsFavorite(false);
        fetchCommentRecipe(recipeJSON.id).then((result) => {
            if (result.status === 200) {
                let commentPush = [];
                for (let i = 0; i < result.data.length; i++) {
                    if (result.data[i].comment !== "") {
                        commentPush.push(result.data[i]);
                    }
                }
                setCommentList(commentPush);
            }
        }).catch((e) => {
            Alert.alert("Erreur !", e.message);
        });
        if (profileRedux.length !== 0) {
            setDisable(false);
            if (favoriteRedux.length !== 0) {
                for (let i = 0; i < favoriteRedux.length; i++) {
                    if (favoriteRedux[i].id === recipeJSON.id) {
                        setIsFavorite(true);
                    }
                }
            }
        } else {
            setDisable(true);
        }
    }, [favoriteRedux, profileRedux, recipe]);

    const [newCommentVisible, setNewCommentVisible] = React.useState(false);
    const [newComment, setNewComment] = React.useState('');

    const connectedRedux = useSelector(getConnected);

    const addCommentPress = () => {
        if (connectedRedux.status) {
            if (newCommentVisible) {
                setNewCommentVisible(false);
            } else {
                setNewCommentVisible(true);
            }
        } else {
            Alert.alert("Erreur !", "Vous devez vous connecter pour ajouter un commentaire.");
        }
    }

    const sendNewComment = () => {
        updateCommentRecipe(profileRedux[0].id, recipeJSON.id, newComment).then((result) => {
            if (result.status === 201) {
                setNewComment('');
                Alert.alert("Ajouté", "Votre commentaire a bien été mis à jour.");
                fetchCommentRecipe(recipeJSON.id).then((result) => {
                    if (result.status === 200) {
                        setCommentList(result.data);
                        setNewCommentVisible(false);
                    }
                }).catch((e) => {
                    Alert.alert("Erreur !", e.message);
                });
            }
        }).catch((e) => {
            postCommentRecipe(profileRedux[0].id, recipeJSON.id, newComment).then((result) => {
                if (result.status === 204) {
                    setNewComment('');
                    fetchCommentRecipe(recipeJSON.id).then((result) => {
                        if (result.status === 200) {
                            Alert.alert("Ajouté", "Votre commentaire a bien été ajouté.");
                            setCommentList(result.data);
                            setNewCommentVisible(false);
                        }
                    });
                }
            }).catch((e) => {
                Alert.alert("Erreur !", e.message);
            });
        });
    }

    const deleteComment = () => {
        updateCommentRecipe(profileRedux[0].id, recipeJSON.id, "").then((result) => {
            if (result.status === 201) {
                setNewComment('');
                fetchCommentRecipe(recipeJSON.id).then((result) => {
                    if (result.status === 200) {
                        Alert.alert("Supprimé", "Votre commentaire a bien été supprimé.");
                        let commentPush = [];
                        for (let i = 0; i < result.data.length; i++) {
                            if (result.data[i].comment !== "") {
                                commentPush.push(result.data[i]);
                            }
                        }
                        setCommentList(commentPush);
                        setNewCommentVisible(false);
                    }
                }).catch((e) => {
                    Alert.alert("Erreur !", e.message);
                });
            }
        }).catch((e) => {
            Alert.alert("Erreur !", e.message);
        });
    }

    const showNewComment = () => {
        if (newCommentVisible) {
            return (
                <View style={styles.windowNewComment}>
                    <Text style={styles.newCommentTitle}>Ajouter un nouveau commentaire :</Text>
                    <TextInput style={styles.input} multiline={true} onChangeText={setNewComment} value={newComment}/>
                    <View>
                        <Pressable style={styles.submitButton} onPress={sendNewComment}>
                            <Text style={styles.textButton}>Ajouter</Text>
                        </Pressable>
                        <Pressable style={styles.deleteButton} onPress={deleteComment}>
                            <Ionicons name='trash-outline' size={25} style={styles.iconComment} />
                        </Pressable>
                    </View>
                </View>
            );
        }
    }

    return (
        <View style={styles.content}>
            <Text style={styles.titleRecipe}>{recipeJSON.namerecipe}</Text>
            <View style={styles.favoriteView}>
                <CheckBox value={isFavorite} onValueChange={checkBoxInteract} color='grey' disabled={disable}/>
                <Text style={styles.favoriteText}>Recette favorite</Text>
            </View>
            <View style={styles.commentView}>
                <Pressable style={styles.commentButton} onPress={addCommentPress}>
                    { () => {
                        if (!newCommentVisible) {
                            return <Ionicons name='clipboard-outline' size={25} style={styles.iconComment}/>;
                        } else {
                            return <Ionicons name='close-outline' size={25} style={styles.iconComment} />;
                        }
                    }}
                </Pressable>
                <Text style={styles.commentTitle}>Commentaires utilisateurs :</Text>
                <ScrollView style={styles.commentList}>
                    <Text>
                        {commentShow()}
                    </Text>
                </ScrollView>
            </View>
            {showNewComment()}
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        //marginLeft: 20
    },
    titleRecipe: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20
    },
    favoriteView: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 30
    },
    favoriteText: {
        marginLeft: 10
    },
    commentView: {
        marginLeft: 20,
        marginRight: 20
    },
    commentTitle: {
        marginBottom: 10
    },
    commentList: {
        marginBottom: 570
    },
    commentButton: {
        position: 'absolute',
        right: 0,
        top: -20,
        backgroundColor: "#D9D9D9", 
        height: 40, 
        width: 40, 
        borderRadius: 20,
        borderColor: "black",
        borderWidth: 1
    },
    deleteButton: {
        position: 'absolute',
        left: 100,
        top: 0,
        backgroundColor: "#D9D9D9", 
        height: 40, 
        width: 40, 
        borderRadius: 20,
        borderColor: "black",
        borderWidth: 1
    },
    iconComment: {
        left: 7,
        top: 5
    },
    windowNewComment: {
        backgroundColor: '#C9BEBE',
        position: 'absolute',
        top: 40,
        left: 3,
        borderRadius: 20,
        borderColor: "black",
        borderWidth: 1,
        height: 300,
        width: 250,
        alignItems: 'center'
    },
    newCommentTitle: {
        textAlign: 'center'
    },
    input: {
        backgroundColor: "#D9D9D9",
        marginLeft: 'auto',
        marginRight: 'auto',
        top: -20,
        width: 230,
        height: 200,
        marginTop: 25,
        elevation: 10,
        textAlignVertical: 'top'
    },
    submitButton: {
        marginTop: 5,
        height: 35,
        width: 80,
        backgroundColor: "#D9D9D9",
        marginRight: 'auto',
        marginLeft: 'auto',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7
    },
    textButton: {
        textAlign: 'center',
        marginTop: 'auto',
        marginBottom: 'auto'
    }
});