const defaultImage = "https://www.iconeasy.com/icon/png/Media/Vinyl%20Record%20Icons/Vinyl%20Violet%20512.png"
const CurrentTrack = () => {
    const showContext = React.useContext(ShowContext);
    //local state
    // const [trackState, setTrackState] = React.useState({isplaying:false});
    const trackRef = React.useRef(null);
    
    React.useEffect(()=>{
        if(showContext.show.isplaying){
            if(trackRef){
                if(trackRef.current){
                    trackRef.current.play();
                }
            }
        } else {
            if(trackRef){
               if(trackRef.current){
                    trackRef.current.pause();
                }
            }
        }
    },[showContext])
    //This function checks if there are tracks in the show context queue if there are play the audio if not then say no more tracks in playlist.
    const renderCurrentTrack = () => {
        if(showContext.show.trackQueue.length > 0) {
            return(
                <div className = "currenttrackcontainer">
                    <div className = "currenttrackimage">
                        <img src={showContext.show.trackQueue[0].imageTrackSrc || defaultImage}/>
                    </div>
                    <div>
                        <div>
                            <h4>{showContext.show.trackQueue[0].songName}</h4>
                            <h4>Artist: {showContext.show.trackQueue[0].artistName}</h4>
                        </div>
                        <div>
                            <audio ref = {trackRef} onPlaying = {handleCurrentTrackStart} onEnded = {handleCurrentTrackEnd} controls = {true} src= {showContext.show.trackQueue[0].trackSrc}>
                        </audio>
                        </div>
                    </div>
                </div>
                )
        } else {
            return(
                <div>
                    <p>
                        No more tracks in playlist.
                    </p>
                </div>)
        }
    };
    //If the track is playing in the local state then return
    const handleCurrentTrackStart = async () => {
        if (showContext.show.isplaying) {
            return; 
        }
        //set the played property to the current time(datePlayed)
        const datePlayed = Date.now();
        //created another helper variable
        const topQueueTrack = showContext.show.trackQueue[0];
        //This updates the played key in the topQueueTrack, the spread operator copies over the rest. 
        const startedTrack = {...topQueueTrack, played:datePlayed}
         // console.log(showContext), displays the data structure;
         console.log({...showContext.show});
         //This updates the show with an updated version similar to line 31.
         showContext.setShow({...showContext.show, isplaying: true, trackQueue:[{...topQueueTrack, timeStarted: datePlayed}, ...showContext.show.trackQueue.slice(1)], tracks: [{...topQueueTrack, timeStarted: datePlayed, inQueue: false},...showContext.show.tracks]}) 
        const updateTrackResponse = await fetch(`/api/shows/track/${topQueueTrack.id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({timeStarted: new Date(datePlayed)})
        })
        const updatedTrackData = await updateTrackResponse.json(); 
        }
    const handleCurrentTrackEnd = async () => {
       const datePlayed = Date.now();
       const topQueueTrack = showContext.show.trackQueue[0];
       const finishedTrack = {...showContext.show.trackQueue[0], timeEnded:Date.now()}
        // console.log(showContext);
        console.log({...showContext.show});
        showContext.setShow({...showContext.show, isplaying:false, trackQueue:showContext.show.trackQueue.slice(1), tracks:[finishedTrack, ...showContext.show.tracks.slice(1)]})
        const updateTrackResponse = await fetch(`/api/shows/track/${topQueueTrack.id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({timeEnded: new Date(datePlayed), inQueue:false})
        })
        const updatedTrackData = await updateTrackResponse.json(); 
    }
    return(
        <div>
           {renderCurrentTrack()} 
        </div>
    )
}