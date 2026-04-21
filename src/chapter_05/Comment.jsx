import React from "react";

const styles = {
    wrapper: {
        margin: 8,
        padding: 8,
        display: "flex",
        flexDirection: "row",
        borderRadius: 16,
        borderWidth: 3,
        borderStyle: "solid",
    },
    imageContainer: {},
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    contentContainer: {
        marginLeft: 8,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    nameText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    commentText: {
        color: "black",
        fontSize: 16,
    },
};

function Comment(props) {
    return (
        <div style={{ ...styles.wrapper, borderColor: props.color }}>
            <div style={styles.imageContainer}>
                <img alt=""
                    src={props.source}
                    style={styles.image}
                />
            </div>
            <div style={styles.contentContainer}>
                <span style={{ ...styles.nameText, color: props.color }}>{props.name}</span>
                <span style={styles.commentText}>{props.comment}</span>
            </div>
        </div>
    );
}

export default Comment;