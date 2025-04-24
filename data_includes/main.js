PennController.ResetPrefix(null)

DebugOff() // don't show log and errors

Sequence("consent", "instructions", "practice", "exp-start", randomize("experimental-trial"), "completion")

// consent
newTrial("consent",
    defaultText
        .center()
        .print()
    ,
    newText("1", "Welcome!")
        .bold()
    ,
    newText("sp1", " ")
    ,
    newText("1", "환영")
        .bold()
    ,
    newText("sp1", " ")
    ,
    newText("2", "Hangul works! And it also works in the button below!")
    ,
    newText("sp2", " ")
    ,
    newText("3", "Click the button below to continue. ")
    ,
    newText("sp3", " ")
    ,
    newButton("button-1", "진행하다")
        .center()
        .print()
        .wait()
)

// instruction
newTrial("instructions",
    defaultText
        .center()
        .print()
    ,
    newText("1", "Experiment instructions:")
        .bold()
    ,
    newText("sp1", " ")
    ,
    newText("2", "In this experiment, you will be listening to three nonsensical words in a sequence. The second word of the sequence will have some noise that covers some of the sounds in the word. ")
    ,
    newText("sp1", " ")
    ,
    newText("3", "Your task in this experiment is to decide if the second word of the sequence, the one with the noise, is the same as the first word or the third word in the sequence. In your keyboard, press 'a' if you think the second word is the same as the first word, and press 'l' if you think the second word is the same as the third word. ")
        .bold()
    ,
    newText("sp2", " ")
    ,
    newText("3", "You should decide this even if the second word has some noise covering some of its sounds, or even if the words don’t mean anything to you. ")
    ,
    newText("sp3", " ")
    ,
    newText("4", "Please provide your responses as quickly as possible.")
        .bold()
    ,
    newText("sp4", " ")
    ,
    newText("5", "For example, click the button below to listen to three example words. ")
    ,
    newText("sp5", " ")
    ,
    newButton("button-listen", "click here to listen")
        .center()
        .print()
        .wait()
    ,
    newAudio("A", "ulna_masked0.wav")
        .play()
        .wait()
    ,
    newTimer("isi1", 500)
        .start()
        .wait()
    ,
    newAudio("X", "ulna.wav")
        .play()
        .wait()
    ,
    newTimer("isi2", 500)
        .start()
        .wait()
    ,
    getAudio("A", "ulna_masked0.wav")
        .play()
        .wait()
    ,
    newText("sp6", " ")
    ,
    newText("6", "Is the second word in the sequence the same as the first word or the third word?")
        .bold()
    ,
    newText("7", "(Press 'a' for 'same as first word' and 'l' for 'same as third word')")
        .italic()
    ,
    newKey("response", "AL")
            .log()
            .wait()
    ,
    newText("sp7", " ")
    ,
    newText("8", "You will now have some more practice. The experiment will start after this practice. There will be a brief questionnaire after you complete the experiment. ")
        .bold()
    ,
    newText("sp8", " ")
    ,
    newText("9", "During practice, adjust your volume to the desired level. ")
    ,
    newText("sp8", " ")
    ,
    newButton("button-cont", "start practice")
        .center()
        .print()
        .wait()
    ,
)

newTrial("practice",
    // shuffle order of masked and unmasked
    axb_seq = ["ulna_masked0.wav", "ulna.wav", "ulna_masked0.wav"]
    ,
    // start trial
    newText("fixcross", "+") // create a fixation cross
        .css("font-size","80px")
        .print("center at 50%" , "center at 50%")
        .log()
    ,
    newTimer("pre-recordings", 100)
        .start()
    ,
    newAudio("audio_a", axb_seq[0])
        .play()
        .wait()
    ,
    newTimer("isi3", 500)
        .start()
        .wait()
    ,
    newAudio("audio_x", axb_seq[1])
        .play()
        .wait()
    ,
    newTimer("isi4", 500)
        .start()
        .wait()
    ,
    getAudio("audio_a")
        .play()
        .wait()
    ,
    getText("fixcross")
        .remove()
    ,
    newText("instr", "(Press 'a' for 'same as first word' and 'l' for 'same as third word')")
        .center()
        .italic()
        .print()
    ,
    newKey("response", "AL")
        .log()
        .wait()
    ,
    getAudio("audio_a")
        .wait("first")
    //,
    //newVar("RT").set(v => Date.now())
)

newTrial("exp-start",
    defaultText
        .center()
        .print()
    ,
    newText("1", "The experiment will now begin. Click the button below when you are ready to begin.")
        .bold()
    ,
    newText("sp8", " ")
    ,
    newButton("button", "start experiment")
        .center()
        .print()
        .wait()
)

Template("items.csv", row =>
    newTrial("experimental-trial",
        // select masked item with random snr
        masking = [row.mask0, row.mask4, row.mask8, row.mask_4, row.mask_8].sort(v => 0.5-Math.random())
        ,
        // shuffle order of masked and unmasked
        axb_seq = [masking[0], row.nomask_cluster, masking[1]].sort(v => 0.5-Math.random())
        ,
        // start trial
        newText("fixcross", "+") // create a fixation cross
            .css("font-size","80px")
            .print("center at 50%" , "center at 50%")
            .log()
        ,
        newTimer("pre-recordings", 100)
            .start()
        ,
        newAudio("audio_a", axb_seq[0])
            .play()
            .wait()
        ,
        newTimer("isi5", 500)
            .start()
            .wait()
        ,
        newAudio("audio_x", axb_seq[1])
            .play()
            .wait()
        ,
        newTimer("isi6", 500)
            .start()
            .wait()
        ,
        newAudio("audio_b", axb_seq[2])
            .play()
            .wait()
        ,
        getText("fixcross")
            .remove()
        ,
        newText("instr", "(Press 'a' for 'same as first word' and 'l' for 'same as third word')")
            .center()
            .italic()
            .print()
        ,
        newKey("response", "AL")
            .log()
            .wait()
        ,
        getAudio("audio_a")
            .wait("first")
        //,
        //newVar("RT").set(v => Date.now())
    )
    .log("group", row.group) // group. tells you what repair was given in trial
    .log("item_id", row.item_id) // item id
    .log("condition", row.condition) // experimental or control condition
    .log("snr", masking[0]) // get name of recording for masked to then get snr
)

SendResults("send")

// post-experiment language survey

// A simple final screen
newTrial ("completion" ,
    newText("Thank you for participation! The experiment is now over. ")
        .center()
        .print()
    ,
    newText("You may now close this page.")
        .center()
        .print()
    ,
    // Stay on this page forever
    newButton().wait()
)

// Missing timer: move to the next trial if no response after 2000 or 3000 ms. 


