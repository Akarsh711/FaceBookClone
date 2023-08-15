import { useRef, useState } from "react";
import "./style.css";
import EmojiPickerBackground from "./EmojiPickerBackground";
import AddToYourPost from "./AddToYourPost";
import ImagePreview from "./ImagePreview";
import useClickOutSide from "../../helpers/clickOutside";
import { createPost } from "../../functions/post";
import PulseLoader from "react-spinners/PulseLoader";
import PostError from "./PostError";
export default function CreatePostPopup({ user, setVisible }) {
	const popup = useRef(null);
	const [showPrev, setShowPrev] = useState(false);
	const [text, setText] = useState();
	const [images, setImages] = useState([]);
	const [background, setBackground] = useState("");
	const [loading, setLoading] = useState("");
	const [error, setError] = useState("");

	useClickOutSide(popup, () => {
		setVisible(false);
	});
	console.log("images", images);


	const postSubmit = async () => {
		if(background){
			  setLoading(true);
			  const res = await createPost(null, background, text, null, null, user.token);
			  setLoading(false);
			  

			  if(res === "ok"){
				setBackground("");
				setText("");
				setVisible(false);
			  }
			  else{
				setError(res);
			  }
		}	
	};
	return (
		<div className="blur">
			<div className="postBox" ref={popup}>
				{
					error && <PostError error={error} setError={setError}/>
				}
				<div className="box_header">
					<div
						className="small_circle"
						onClick={() => {
							setVisible(false);
						}}>
						<i className="exit_icon"></i>
					</div>
					<span>Create Post</span>
				</div>
				<div className="box_profile">
					<img src={user?.picture} alt="" className="box_profile_img" />
					<div className="box_col">
						<div className="box_profile_name">
							{user?.first_name} {user?.last_name}
						</div>
						<div className="box_privacy">
							<img src="../../icons/public.png" alt="" />
							<span>Public</span>
							<i className="arrowDown_icon"></i>
						</div>
					</div>
				</div>
				{/* <div className="flex_center">
                <textarea 
                 maxLength="100"
                 className="post_input"
                 placeholder={`What's on you mind, ${user?.first_name}`}
                 onChange = {(e)=> setText(e.target.value)}
                 value={text}
                 ref={textRef}
                >
                </textarea>
                
            </div> */}
				{!showPrev ? (
					<>
						<EmojiPickerBackground
							text={text}
							user={user}
							setText={setText}
							showPrev={showPrev}
							background={background}
							setBackground={setBackground}
						/>
					</>
				) : (
					<ImagePreview
						text={text}
						user={user}
						setText={setText}
						showPrev={showPrev}
						images={images}
						setImages={setImages}
						setShowPrev={setShowPrev}
					/>
				)}

				<AddToYourPost setShowPrev={setShowPrev} />
				<button className="post_submit" onClick={()=>{postSubmit()}}>{loading ? <PulseLoader color="#fff" size={5}/>:"Post"}</button>
			</div>
		</div>
	);
}
