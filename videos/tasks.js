window.CreativeContactBenchTasks = {
  "documentTitle": "CreativeContactBench Real-World Task Reproduction Metadata",
  "sourceDocument": "taskss.docx",
  "authorityNotes": [
    "Task text, options, rationales, and source notes are grounded in the uploaded taskss.docx.",
    "Tasks are reordered numerically from 1 through 19.",
    "Preferred options are populated only when the source explicitly marked or stated one.",
    "Source recording filenames are references only. They are not mapped to A/B/C/D unless the source explicitly provides that mapping.",
    "Null fields must remain null unless the user supplies additional metadata."
  ],
  "tasks": [
    {
      "id": 1,
      "slug": "task-1",
      "title": "Make a mark on the white paper",
      "titleStatus": "verbatim_from_source_heading",
      "goal": "Make a mark on the white paper.",
      "sceneDescription": null,
      "sourceQuestion": null,
      "poster": "./posters/task-01.jpg?v=rendering-20260826",
      "posterStatus": "source document",
      "sensorModality": null,
      "tags": [],
      "passiveSensorObservation": null,
      "rgbAmbiguity": null,
      "creativeRationale": null,
      "preferredOption": null,
      "preferredStatus": "not_explicit_in_source",
      "options": [
        {
          "label": "A",
          "strategy": "Pick up the pen and write directly on the paper.",
          "rationaleLabel": "Completes the task directly",
          "title": "Completes the task directly",
          "description": "Pick up the pen and write directly on the paper.",
          "rationale": null,
          "success": {
            "successes": 1,
            "trials": 5
          },
          "video": "Task 1/task1_A.mp4",
          "videoStatus": "available",
          "mappingStatus": "verified from existing manifest",
          "actualFilename": "task1_A.mp4"
        },
        {
          "label": "B",
          "strategy": "Place the can on the corner so it continues to hold the paper flat, release the can, then pick up the pen and write on the exposed area.",
          "rationaleLabel": "Creatively uses the can as a passive weight",
          "title": "Creatively uses the can as a passive weight",
          "description": "Place the can on the corner so it continues to hold the paper flat, release the can, then pick up the pen and write on the exposed area.",
          "rationale": null,
          "success": {
            "successes": 5,
            "trials": 5
          },
          "video": "Task 1/task2_B.mp4",
          "videoStatus": "available",
          "mappingStatus": "verified from existing manifest",
          "actualFilename": "task2_B.mp4"
        },
        {
          "label": "C",
          "strategy": "Hold the curled corner down with the gripper while trying to write with the pen.",
          "rationaleLabel": "Fails to consider resource conflict regarding the single arm",
          "title": "Fails to consider resource conflict regarding the single arm",
          "description": "Hold the curled corner down with the gripper while trying to write with the pen.",
          "rationale": null,
          "success": {
            "successes": 0,
            "trials": 5
          },
          "video": "Task 1/Task1_C.mp4",
          "videoStatus": "available",
          "mappingStatus": "verified from existing manifest",
          "actualFilename": "Task1_C.mp4"
        },
        {
          "label": "D",
          "strategy": "Roll the can across the paper to flatten it, put the can aside, then pick up the pen and write.",
          "rationaleLabel": "Performs only temporary shaping without permanent fixation",
          "title": "Performs only temporary shaping without permanent fixation",
          "description": "Roll the can across the paper to flatten it, put the can aside, then pick up the pen and write.",
          "rationale": null,
          "success": {
            "successes": 1,
            "trials": 5
          },
          "video": "Task 1/Task1_D.mp4",
          "videoStatus": "available",
          "mappingStatus": "verified from existing manifest",
          "actualFilename": "Task1_D.mp4"
        }
      ],
      "realWorldOutcome": null,
      "modelRankings": {
        "rgbOnly": [],
        "rgbSensor": []
      },
      "sourceRecordingReferences": [
        "recording_20260804_165313.mp4",
        "recording_20260804_170850.mp4",
        "recording_20260804_171344.mp4",
        "recording_20260804_181008.mp4"
      ],
      "sourceNotes": [
        "No separate scene description or ranking question was provided."
      ],
      "editorialNotes": [],
      "actualVideoInventory": [
        {
          "filename": "Task1_C.mp4",
          "sizeBytes": 12159028,
          "option": "C",
          "mappingStatus": "verified from existing manifest"
        },
        {
          "filename": "Task1_D.mp4",
          "sizeBytes": 57747328,
          "option": "D",
          "mappingStatus": "verified from existing manifest"
        },
        {
          "filename": "task1_A.mp4",
          "sizeBytes": 51238821,
          "option": "A",
          "mappingStatus": "verified from existing manifest"
        },
        {
          "filename": "task2_B.mp4",
          "sizeBytes": 73974432,
          "option": "B",
          "mappingStatus": "verified from existing manifest"
        }
      ],
      "missingVideoOptions": []
    },
    {
      "id": 2,
      "slug": "task-2",
      "title": "Move the powered device into the target area",
      "titleStatus": "verbatim_from_source_heading",
      "goal": "Move the powered device into the target area.",
      "sceneDescription": null,
      "sourceQuestion": null,
      "poster": "./posters/task-02.jpg?v=rendering-20260826",
      "posterStatus": "source document",
      "sensorModality": null,
      "tags": [],
      "passiveSensorObservation": null,
      "rgbAmbiguity": null,
      "creativeRationale": null,
      "preferredOption": null,
      "preferredStatus": "not_explicit_in_source",
      "options": [
        {
          "label": "A",
          "strategy": "Pick up the device and move it directly to the marked target, even if the cable becomes taut.",
          "rationaleLabel": null,
          "title": null,
          "description": "Pick up the device and move it directly to the marked target, even if the cable becomes taut.",
          "rationale": null,
          "video": "Task 2/A.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "A.mp4"
        },
        {
          "label": "B",
          "strategy": "Unplug the device, move it to the marked target.",
          "rationaleLabel": null,
          "title": null,
          "description": "Unplug the device, move it to the marked target.",
          "rationale": null,
          "video": "Task 2/B.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "B.mp4"
        },
        {
          "label": "C",
          "strategy": "Pull the device toward the target by its cable instead of grasping the device itself.",
          "rationaleLabel": null,
          "title": null,
          "description": "Pull the device toward the target by its cable instead of grasping the device itself.",
          "rationale": null,
          "video": "Task 2/C.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "C.mp4"
        },
        {
          "label": "D",
          "strategy": "First move the power strip closer to the marked target to provide more cable slack, then pick up the device and place it in the target.",
          "rationaleLabel": null,
          "title": null,
          "description": "First move the power strip closer to the marked target to provide more cable slack, then pick up the device and place it in the target.",
          "rationale": null,
          "video": "Task 2/D.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "D.mp4"
        }
      ],
      "realWorldOutcome": null,
      "modelRankings": {
        "rgbOnly": [],
        "rgbSensor": []
      },
      "sourceRecordingReferences": [
        "recording_20260804_183422.mp4",
        "recording_20260804_190029.mp4",
        "recording_20260804_191030.mp4",
        "recording_20260804_192818.mp4"
      ],
      "sourceNotes": [
        "No option rationales, separate scene description, or explicit preferred strategy were provided."
      ],
      "editorialNotes": [],
      "actualVideoInventory": [
        {
          "filename": "A.mp4",
          "sizeBytes": 30072927,
          "option": "A",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "B.mp4",
          "sizeBytes": 43545277,
          "option": "B",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "C.mp4",
          "sizeBytes": 47474412,
          "option": "C",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "D.mp4",
          "sizeBytes": 28151226,
          "option": "D",
          "mappingStatus": "mapped from A/B/C/D filename"
        }
      ],
      "missingVideoOptions": []
    },
    {
      "id": 3,
      "slug": "task-3",
      "title": "Put the tape inside the box and fully close the lid",
      "titleStatus": "verbatim_from_source_heading",
      "goal": "Put the tape inside the box and fully close the lid.",
      "sceneDescription": null,
      "sourceQuestion": null,
      "poster": "./posters/task-03.jpg?v=rendering-20260826",
      "posterStatus": "source document",
      "sensorModality": null,
      "tags": [],
      "passiveSensorObservation": null,
      "rgbAmbiguity": null,
      "creativeRationale": null,
      "preferredOption": null,
      "preferredStatus": "not_explicit_in_source",
      "options": [
        {
          "label": "A",
          "strategy": "Pick up the tape, place it inside the box, and close the lid.",
          "rationaleLabel": "Ignore the obstacle",
          "title": "Ignore the obstacle",
          "description": "Pick up the tape, place it inside the box, and close the lid.",
          "rationale": null,
          "video": "Task 3/A.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "A.mp4"
        },
        {
          "label": "B",
          "strategy": "Lay the bottle horizontally inside the box, pick up the tape, place it inside the box, and close the lid.",
          "rationaleLabel": "Change posture",
          "title": "Change posture",
          "description": "Lay the bottle horizontally inside the box, pick up the tape, place it inside the box, and close the lid.",
          "rationale": null,
          "video": "Task 3/B.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "B.mp4"
        },
        {
          "label": "C",
          "strategy": "Remove the bottle from the box, pick up the tape, place it inside the box, and close the lid.",
          "rationaleLabel": "Remove the obstacle",
          "title": "Remove the obstacle",
          "description": "Remove the bottle from the box, pick up the tape, place it inside the box, and close the lid.",
          "rationale": null,
          "video": "Task 3/C.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "C.mp4"
        },
        {
          "label": "D",
          "strategy": "Move the bottle to another upright position inside the box, pick up the tape, place it inside the box, and close the lid.",
          "rationaleLabel": "Change only the position",
          "title": "Change only the position",
          "description": "Move the bottle to another upright position inside the box, pick up the tape, place it inside the box, and close the lid.",
          "rationale": null,
          "video": "Task 3/D.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "D.mp4"
        }
      ],
      "realWorldOutcome": null,
      "modelRankings": {
        "rgbOnly": [],
        "rgbSensor": []
      },
      "sourceRecordingReferences": [
        "recording_20260805_101227.mp4",
        "recording_20260805_102055.mp4",
        "recording_20260805_104037.mp4",
        "recording_20260805_105456.mp4",
        "recording_20260805_110916.mp4"
      ],
      "sourceNotes": [
        "The source lists five recording filenames for four options; it does not explicitly map recordings to A/B/C/D.",
        "No explicit preferred strategy was provided."
      ],
      "editorialNotes": [],
      "actualVideoInventory": [
        {
          "filename": "A.mp4",
          "sizeBytes": 75132286,
          "option": "A",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "B.mp4",
          "sizeBytes": 106982562,
          "option": "B",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "C.mp4",
          "sizeBytes": 110439839,
          "option": "C",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "D.mp4",
          "sizeBytes": 103679257,
          "option": "D",
          "mappingStatus": "mapped from A/B/C/D filename"
        }
      ],
      "missingVideoOptions": []
    },
    {
      "id": 4,
      "slug": "task-4",
      "title": "Close the box",
      "titleStatus": "capitalization_normalized_from_source_heading",
      "goal": "Close the box.",
      "sceneDescription": null,
      "sourceQuestion": null,
      "poster": "./posters/task-04.jpg?v=rendering-20260826",
      "posterStatus": "source document",
      "sensorModality": null,
      "tags": [],
      "passiveSensorObservation": null,
      "rgbAmbiguity": null,
      "creativeRationale": null,
      "preferredOption": null,
      "preferredStatus": "not_explicit_in_source",
      "options": [
        {
          "label": "A",
          "strategy": "Grasp the edge of the lid, lift it, and place it on top of the box.",
          "rationaleLabel": "Edge grasping without adding weight to the box",
          "title": "Edge grasping without adding weight to the box",
          "description": "Grasp the edge of the lid, lift it, and place it on top of the box.",
          "rationale": "When the lid contacts the box, the lightweight box may slide across the table.",
          "video": "Task 4/A.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "A.mp4"
        },
        {
          "label": "B",
          "strategy": "Insert the gripper underneath the lid, lift and flip the lid, and place it on top of the box.",
          "rationaleLabel": "Lifting and flipping the lid from underneath without adding weight to the box",
          "title": "Lifting and flipping the lid from underneath without adding weight to the box",
          "description": "Insert the gripper underneath the lid, lift and flip the lid, and place it on top of the box.",
          "rationale": "This makes the lid easier to manipulate, but the box may still slide during final closure.",
          "video": "Task 4/B.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "B.mp4"
        },
        {
          "label": "C",
          "strategy": "Lay the can horizontally inside the box, grasp the edge of the lid, and place the lid on top of the box.",
          "rationaleLabel": "Adding weight to the box while using an edge grasp",
          "title": "Adding weight to the box while using an edge grasp",
          "description": "Lay the can horizontally inside the box, grasp the edge of the lid, and place the lid on top of the box.",
          "rationale": "This addresses the sliding problem. However, grasping the thin edge of the lid requires substantial wrist rotation and pose adjustment, which may exceed the available workspace or kinematic range of a single robot arm.",
          "video": "Task 4/C.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "C.mp4"
        },
        {
          "label": "D",
          "strategy": "Lay the can horizontally inside the box, insert the gripper underneath the lid, lift and flip the lid, and place it on top of the box.",
          "rationaleLabel": "Adding weight and lifting the lid from underneath",
          "title": "Adding weight and lifting the lid from underneath",
          "description": "Lay the can horizontally inside the box, insert the gripper underneath the lid, lift and flip the lid, and place it on top of the box.",
          "rationale": "The can acts as ballast to stabilize the box, while supporting the lid from underneath reduces the need for precise edge grasping and extensive wrist rotation.",
          "video": "Task 4/D.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "D.mp4"
        }
      ],
      "realWorldOutcome": null,
      "modelRankings": {
        "rgbOnly": [],
        "rgbSensor": []
      },
      "sourceRecordingReferences": [
        "recording_20260805_125258.mp4",
        "recording_20260805_130958.mp4",
        "recording_20260805_131526.mp4",
        "recording_20260805_132125.mp4"
      ],
      "sourceNotes": [
        "The rationales evaluate all four options, but the source does not explicitly mark a preferred option."
      ],
      "editorialNotes": [],
      "actualVideoInventory": [
        {
          "filename": "A.mp4",
          "sizeBytes": 75703709,
          "option": "A",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "B.mp4",
          "sizeBytes": 80002210,
          "option": "B",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "C.mp4",
          "sizeBytes": 50999609,
          "option": "C",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "D.mp4",
          "sizeBytes": 35919030,
          "option": "D",
          "mappingStatus": "mapped from A/B/C/D filename"
        }
      ],
      "missingVideoOptions": []
    },
    {
      "id": 5,
      "slug": "task-5",
      "title": "Align the soda cans in a line",
      "titleStatus": "verbatim_from_source_heading",
      "goal": "Align the soda cans in a line.",
      "sceneDescription": null,
      "sourceQuestion": null,
      "poster": "./posters/task-05.jpg?v=rendering-20260826",
      "posterStatus": "source document",
      "sensorModality": null,
      "tags": [],
      "passiveSensorObservation": null,
      "rgbAmbiguity": null,
      "creativeRationale": null,
      "preferredOption": null,
      "preferredStatus": "not_explicit_in_source",
      "options": [
        {
          "label": "A",
          "strategy": "Pick up one can and place it between the other two cans along the line connecting them.",
          "rationaleLabel": "Moving only one can",
          "title": "Moving only one can",
          "description": "Pick up one can and place it between the other two cans along the line connecting them.",
          "rationale": "This approach works only if the other two cans are already positioned appropriately and the third can can be placed between them. In the current scene, the three cans are spread far apart, so moving only one can is unlikely to produce a reasonably spaced straight line.",
          "video": "Task 5/A.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "A.mp4"
        },
        {
          "label": "B",
          "strategy": "Pick up and reposition each of the three cans one at a time until they form a straight line.",
          "rationaleLabel": "Precisely repositioning the cans one at a time",
          "title": "Precisely repositioning the cans one at a time",
          "description": "Pick up and reposition each of the three cans one at a time until they form a straight line.",
          "rationale": "This is a direct and feasible conventional approach, but it requires three separate pick-and-place actions. Each action also requires accurate estimation of the target position and orientation.",
          "video": "Task 5/B.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "B.mp4"
        },
        {
          "label": "C",
          "strategy": "Grasp the rim of the plastic container and sweep its side across the three cans to align them.",
          "rationaleLabel": "Grasping the container’s rim and sweeping the cans",
          "title": "Grasping the container’s rim and sweeping the cans",
          "description": "Grasp the rim of the plastic container and sweep its side across the three cans to align them.",
          "rationale": "This approach uses the container’s straight edge. However, the robot must securely grasp the thin rim while controlling the container’s orientation and contact force. During the sweeping motion, the container may rotate, tilt, or slip from the gripper.",
          "video": "Task 5/C.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "C.mp4"
        },
        {
          "label": "D",
          "strategy": "Push the plastic container across the table so that one of its straight sides contacts and aligns the three cans.",
          "rationaleLabel": "Pushing the container to align the cans together",
          "title": "Pushing the container to align the cans together",
          "description": "Push the plastic container across the table so that one of its straight sides contacts and aligns the three cans.",
          "rationale": "The robot does not need to grasp the container; it only needs to push against its outer wall. A straight side of the container can contact multiple cans simultaneously and push them against a common reference line. This approach requires fewer actions and avoids individually positioning each can.",
          "video": "Task 5/D.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "D.mp4"
        }
      ],
      "realWorldOutcome": null,
      "modelRankings": {
        "rgbOnly": [],
        "rgbSensor": []
      },
      "sourceRecordingReferences": [
        "recording_20260805_132823.mp4",
        "recording_20260805_134106.mp4",
        "recording_20260805_134752.mp4",
        "recording_20260805_135510.mp4"
      ],
      "sourceNotes": [
        "The rationales evaluate all four options, but the source does not explicitly mark a preferred option."
      ],
      "editorialNotes": [],
      "actualVideoInventory": [
        {
          "filename": "A.mp4",
          "sizeBytes": 31963565,
          "option": "A",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "B.mp4",
          "sizeBytes": 45104677,
          "option": "B",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "C.mp4",
          "sizeBytes": 37501976,
          "option": "C",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "D.mp4",
          "sizeBytes": 37860809,
          "option": "D",
          "mappingStatus": "mapped from A/B/C/D filename"
        }
      ],
      "missingVideoOptions": []
    },
    {
      "id": 6,
      "slug": "task-6",
      "title": "Move the upside-down casserole to the target position",
      "titleStatus": "derived_from_source_scene_and_question",
      "goal": "Move the upside-down casserole to the marked target position.",
      "sceneDescription": "An empty casserole dish is upside down on a normal table surface, with some vegetables and cereals nearby. The task is to move the casserole to the marked target position.",
      "sourceQuestion": "Rank the following candidate strategies for moving the casserole to the green target position, from BEST to WORST.",
      "poster": "./posters/task-06.jpg?v=rendering-20260826",
      "posterStatus": "source document",
      "sensorModality": null,
      "tags": [],
      "passiveSensorObservation": null,
      "rgbAmbiguity": null,
      "creativeRationale": null,
      "preferredOption": "C",
      "preferredStatus": "explicit_best_marker_in_source",
      "options": [
        {
          "label": "A",
          "strategy": "Push the casserole straight across the table toward the green target using the robot arm.",
          "rationaleLabel": null,
          "title": null,
          "description": "Push the casserole straight across the table toward the green target using the robot arm.",
          "rationale": null,
          "video": "Task 6/A.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "A.mp4"
        },
        {
          "label": "B",
          "strategy": "Try to pick up the upside-down casserole directly from the table and carry it to the green target.",
          "rationaleLabel": null,
          "title": null,
          "description": "Try to pick up the upside-down casserole directly from the table and carry it to the green target.",
          "rationale": null,
          "video": "Task 6/B.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "B.mp4"
        },
        {
          "label": "C",
          "strategy": "Slide the casserole to the table edge, grasp the exposed overhanging part, and carry it to the green target.",
          "rationaleLabel": null,
          "title": null,
          "description": "Slide the casserole to the table edge, grasp the exposed overhanging part, and carry it to the green target.",
          "rationale": null,
          "video": "Task 6/C.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "C.mp4"
        },
        {
          "label": "D",
          "strategy": "Push the casserole toward the target from a different angle around the nearby items.",
          "rationaleLabel": null,
          "title": null,
          "description": "Push the casserole toward the target from a different angle around the nearby items.",
          "rationale": null,
          "video": "Task 6/D.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "D.mp4"
        }
      ],
      "realWorldOutcome": null,
      "modelRankings": {
        "rgbOnly": [],
        "rgbSensor": []
      },
      "sourceRecordingReferences": [],
      "sourceNotes": [
        "The source contains no recording filenames for this task."
      ],
      "editorialNotes": [],
      "actualVideoInventory": [
        {
          "filename": "A.mp4",
          "sizeBytes": 31597251,
          "option": "A",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "B.mp4",
          "sizeBytes": 38304998,
          "option": "B",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "C.mp4",
          "sizeBytes": 30119952,
          "option": "C",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "D.mp4",
          "sizeBytes": 73593875,
          "option": "D",
          "mappingStatus": "mapped from A/B/C/D filename"
        }
      ],
      "missingVideoOptions": []
    },
    {
      "id": 7,
      "slug": "task-7",
      "title": "Move the filled bowl to the target position",
      "titleStatus": "derived_from_source_scene_and_options",
      "goal": "Move the filled bowl to the marked target position.",
      "sceneDescription": "A bowl sits upright on a normal table surface filled to the rim. Some vegetables and cereals are nearby on the table, and the task is to move the bucket to the marked target position.",
      "sourceQuestion": "Rank the following candidate strategies for moving the bucket to the green target position, from BEST to WORST.",
      "poster": "./posters/task-07.jpg?v=rendering-20260826",
      "posterStatus": "source document",
      "sensorModality": null,
      "tags": [],
      "passiveSensorObservation": null,
      "rgbAmbiguity": null,
      "creativeRationale": null,
      "preferredOption": null,
      "preferredStatus": "not_explicit_in_source",
      "options": [
        {
          "label": "A",
          "strategy": "Grasp the bowl and lift it directly to the target position.",
          "rationaleLabel": null,
          "title": null,
          "description": "Grasp the bowl and lift it directly to the target position.",
          "rationale": null,
          "video": "Task 7/A.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "A.mp4"
        },
        {
          "label": "B",
          "strategy": "Push the bowl toward the target using the both sides of the gripper.",
          "rationaleLabel": null,
          "title": null,
          "description": "Push the bowl toward the target using the both sides of the gripper.",
          "rationale": null,
          "video": "Task 7/B.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "B.mp4"
        },
        {
          "label": "C",
          "strategy": "Push the bow gently and straight toward the target using narrower side of the gripper.",
          "rationaleLabel": null,
          "title": null,
          "description": "Push the bow gently and straight toward the target using narrower side of the gripper.",
          "rationale": null,
          "video": "Task 7/C.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "C.mp4"
        },
        {
          "label": "D",
          "strategy": "Grasp the rim of the bowl and slide it to the target.",
          "rationaleLabel": null,
          "title": null,
          "description": "Grasp the rim of the bowl and slide it to the target.",
          "rationale": null,
          "video": "Task 7/D.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "D.mp4"
        }
      ],
      "realWorldOutcome": null,
      "modelRankings": {
        "rgbOnly": [],
        "rgbSensor": []
      },
      "sourceRecordingReferences": [],
      "sourceNotes": [
        "The source scene and poster show a bowl, but the scene/question also use the word “bucket.”",
        "Option C contains the source typo “bow”; it has been preserved in the option text.",
        "The source contains no recording filenames for this task."
      ],
      "editorialNotes": [],
      "actualVideoInventory": [
        {
          "filename": "A.mp4",
          "sizeBytes": 35255977,
          "option": "A",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "B.mp4",
          "sizeBytes": 30877380,
          "option": "B",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "C.mp4",
          "sizeBytes": 45962355,
          "option": "C",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "D.mp4",
          "sizeBytes": 47421492,
          "option": "D",
          "mappingStatus": "mapped from A/B/C/D filename"
        }
      ],
      "missingVideoOptions": []
    },
    {
      "id": 8,
      "slug": "task-8",
      "title": "Move the heavy container to the target position",
      "titleStatus": "derived_from_source_scene_and_options",
      "goal": "Move the heavy container to the marked target position.",
      "sceneDescription": "A heavy container sits upright on a sandpaper kept on the surface. Some vegetables and cereals are nearby on the table, and the task is to move the container to the marked target position.",
      "sourceQuestion": "Rank the following candidate strategies for moving the bucket to the green target position, from BEST to WORST.",
      "poster": "./posters/task-08.jpg?v=rendering-20260826",
      "posterStatus": "source document",
      "sensorModality": null,
      "tags": [],
      "passiveSensorObservation": null,
      "rgbAmbiguity": null,
      "creativeRationale": null,
      "preferredOption": null,
      "preferredStatus": "not_explicit_in_source",
      "options": [
        {
          "label": "A",
          "strategy": "Grasp the container from top and lift it directly to the target position.",
          "rationaleLabel": null,
          "title": null,
          "description": "Grasp the container from top and lift it directly to the target position.",
          "rationale": null,
          "video": "Task 8/A.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "A.mp4"
        },
        {
          "label": "B",
          "strategy": "Push the container toward the target.",
          "rationaleLabel": null,
          "title": null,
          "description": "Push the container toward the target.",
          "rationale": null,
          "video": "Task 8/B.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "B.mp4"
        },
        {
          "label": "C",
          "strategy": "Grasp the container from side and lift it directly to the target position.",
          "rationaleLabel": null,
          "title": null,
          "description": "Grasp the container from side and lift it directly to the target position.",
          "rationale": null,
          "video": "Task 8/C.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "C.mp4"
        },
        {
          "label": "D",
          "strategy": "Cannot be Done.",
          "rationaleLabel": null,
          "title": null,
          "description": "Cannot be Done.",
          "rationale": null,
          "video": null,
          "videoStatus": "missing",
          "mappingStatus": "missing on disk",
          "actualFilename": null
        }
      ],
      "realWorldOutcome": null,
      "modelRankings": {
        "rgbOnly": [],
        "rgbSensor": []
      },
      "sourceRecordingReferences": [],
      "sourceNotes": [
        "The source scene and options use “container,” while the question uses “bucket.”",
        "The source contains no recording filenames for this task."
      ],
      "editorialNotes": [],
      "actualVideoInventory": [
        {
          "filename": "A.mp4",
          "sizeBytes": 43301180,
          "option": "A",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "B.mp4",
          "sizeBytes": 81205205,
          "option": "B",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "C.mp4",
          "sizeBytes": 46181791,
          "option": "C",
          "mappingStatus": "mapped from A/B/C/D filename"
        }
      ],
      "missingVideoOptions": [
        "D"
      ]
    },
    {
      "id": 9,
      "slug": "task-9",
      "title": "Move the broccoli to the bowl",
      "titleStatus": "derived_from_source_scene",
      "goal": "Move the broccoli to the bowl.",
      "sceneDescription": "A broccoli sits on the table with its stalk pressed against the table surface. A bell pepper is wedged snugly against the side of the broccoli. The robot's task is to move the broccoli to the bowl.",
      "sourceQuestion": "Rank the following candidate strategies for moving the cauliflower to the green target position, from BEST to WORST.",
      "poster": "./posters/task-09.jpg?v=rendering-20260826",
      "posterStatus": "source document",
      "sensorModality": null,
      "tags": [],
      "passiveSensorObservation": null,
      "rgbAmbiguity": null,
      "creativeRationale": null,
      "preferredOption": null,
      "preferredStatus": "not_explicit_in_source",
      "options": [
        {
          "label": "A",
          "strategy": "Grasp the bell pepper and move it aside, then pick and place the broccoli using its stalk to the bowl.",
          "rationaleLabel": null,
          "title": null,
          "description": "Grasp the bell pepper and move it aside, then pick and place the broccoli using its stalk to the bowl.",
          "rationale": null,
          "video": "Task 9/A.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "A.mp4"
        },
        {
          "label": "B",
          "strategy": "Push the broccoli straight toward the bowl without moving the bell pepper first.",
          "rationaleLabel": null,
          "title": null,
          "description": "Push the broccoli straight toward the bowl without moving the bell pepper first.",
          "rationale": null,
          "video": "Task 9/B.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "B.mp4"
        },
        {
          "label": "C",
          "strategy": "Push the bell pepper using the gripper and pick and place the broccoli into the bowl.",
          "rationaleLabel": null,
          "title": null,
          "description": "Push the bell pepper using the gripper and pick and place the broccoli into the bowl.",
          "rationale": null,
          "video": "Task 9/C.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "C.mp4"
        },
        {
          "label": "D",
          "strategy": "Grasp the broccoli directly and carry it to the target.",
          "rationaleLabel": null,
          "title": null,
          "description": "Grasp the broccoli directly and carry it to the target.",
          "rationale": null,
          "video": "Task 9/D.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "D.mp4"
        }
      ],
      "realWorldOutcome": null,
      "modelRankings": {
        "rgbOnly": [],
        "rgbSensor": []
      },
      "sourceRecordingReferences": [],
      "sourceNotes": [
        "The scene and options refer to broccoli and a bowl, while the source question refers to cauliflower and a green target.",
        "The source contains no recording filenames for this task."
      ],
      "editorialNotes": [],
      "actualVideoInventory": [
        {
          "filename": "A.mp4",
          "sizeBytes": 22201437,
          "option": "A",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "B.mp4",
          "sizeBytes": 45084145,
          "option": "B",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "C.mp4",
          "sizeBytes": 73181158,
          "option": "C",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "D.mp4",
          "sizeBytes": 57469273,
          "option": "D",
          "mappingStatus": "mapped from A/B/C/D filename"
        }
      ],
      "missingVideoOptions": []
    },
    {
      "id": 10,
      "slug": "task-10",
      "title": "Flatten the tablecloth wrinkle without moving any objects",
      "titleStatus": "derived_from_source_scene_description",
      "goal": "Flatten the wrinkle on the tablecloth without changing the positions of any objects.",
      "sceneDescription": "Flatten the wrinkle on the tablecloth without changing the positions of any objects.",
      "sourceQuestion": "Rank the following candidate strategies for moving the bucket to the green target position, from BEST to WORST.",
      "poster": "./posters/task-10.jpg?v=rendering-20260826",
      "posterStatus": "source document",
      "sensorModality": null,
      "tags": [],
      "passiveSensorObservation": null,
      "rgbAmbiguity": null,
      "creativeRationale": null,
      "preferredOption": null,
      "preferredStatus": "not_explicit_in_source",
      "options": [
        {
          "label": "A",
          "strategy": "Place the can on the largest wrinkle and leave it there as a weight.",
          "rationaleLabel": null,
          "title": null,
          "description": "Place the can on the largest wrinkle and leave it there as a weight.",
          "rationale": null,
          "video": "Task 10/A.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "A.mp4"
        },
        {
          "label": "B",
          "strategy": "Set the can aside and try to pull the distant tablecloth corner with the gripper.",
          "rationaleLabel": null,
          "title": null,
          "description": "Set the can aside and try to pull the distant tablecloth corner with the gripper.",
          "rationale": null,
          "video": "Task 10/B.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "B.mp4"
        },
        {
          "label": "C",
          "strategy": "Press a flat face of the can against the wrinkle and slide it toward the nearest table edge.",
          "rationaleLabel": null,
          "title": null,
          "description": "Press a flat face of the can against the wrinkle and slide it toward the nearest table edge.",
          "rationale": null,
          "video": "Task 10/C.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "C.mp4"
        },
        {
          "label": "D",
          "strategy": "Tap the wrinkled area with the gripper.",
          "rationaleLabel": null,
          "title": null,
          "description": "Tap the wrinkled area with the gripper.",
          "rationale": null,
          "video": "Task 10/D.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "D.mp4"
        }
      ],
      "realWorldOutcome": null,
      "modelRankings": {
        "rgbOnly": [],
        "rgbSensor": []
      },
      "sourceRecordingReferences": [],
      "sourceNotes": [
        "The source question is unrelated to the tablecloth task and appears to be copied from another task; the normalized goal is taken from the scene description.",
        "The source contains no recording filenames for this task."
      ],
      "editorialNotes": [],
      "actualVideoInventory": [
        {
          "filename": "A.mp4",
          "sizeBytes": 161693464,
          "option": "A",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "B.mp4",
          "sizeBytes": 24560371,
          "option": "B",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "C.mp4",
          "sizeBytes": 45347450,
          "option": "C",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "D.mp4",
          "sizeBytes": 35171286,
          "option": "D",
          "mappingStatus": "mapped from A/B/C/D filename"
        }
      ],
      "missingVideoOptions": []
    },
    {
      "id": 11,
      "slug": "task-11",
      "title": "Find the lightest block",
      "titleStatus": "verbatim_from_source_task_statement",
      "goal": "Find the lightest block.",
      "sceneDescription": null,
      "sourceQuestion": null,
      "poster": "./posters/task-11.jpg?v=rendering-20260826",
      "posterStatus": "source document",
      "sensorModality": null,
      "tags": [],
      "passiveSensorObservation": null,
      "rgbAmbiguity": null,
      "creativeRationale": null,
      "preferredOption": null,
      "preferredStatus": "not_explicit_in_source",
      "options": [
        {
          "label": "A",
          "strategy": "Pick the nearest cube and place it on the target.",
          "rationaleLabel": null,
          "title": null,
          "description": "Pick the nearest cube and place it on the target.",
          "rationale": null,
          "video": "Task 11/A.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "A.mp4"
        },
        {
          "label": "B",
          "strategy": "Squeeze each cube and choose the one with the weakest tactile response.",
          "rationaleLabel": null,
          "title": null,
          "description": "Squeeze each cube and choose the one with the weakest tactile response.",
          "rationale": null,
          "video": "Task 11/B.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "B.mp4"
        },
        {
          "label": "C",
          "strategy": "Put the cubes into the water, choose the one that floats, and then place it on the target.",
          "rationaleLabel": null,
          "title": null,
          "description": "Put the cubes into the water, choose the one that floats, and then place it on the target.",
          "rationale": null,
          "video": "Task 11/C.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "C.mp4"
        },
        {
          "label": "D",
          "strategy": "Push each cube across the table and choose the one that slides farthest.",
          "rationaleLabel": null,
          "title": null,
          "description": "Push each cube across the table and choose the one that slides farthest.",
          "rationale": null,
          "video": null,
          "videoStatus": "missing",
          "mappingStatus": "missing on disk",
          "actualFilename": null
        }
      ],
      "realWorldOutcome": null,
      "modelRankings": {
        "rgbOnly": [],
        "rgbSensor": []
      },
      "sourceRecordingReferences": [],
      "sourceNotes": [
        "No separate scene description, ranking question, option rationales, or recording filenames were provided."
      ],
      "editorialNotes": [],
      "actualVideoInventory": [
        {
          "filename": "A.mp4",
          "sizeBytes": 129372136,
          "option": "A",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "B.mp4",
          "sizeBytes": 68164592,
          "option": "B",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "C.mp4",
          "sizeBytes": 42569749,
          "option": "C",
          "mappingStatus": "mapped from A/B/C/D filename"
        }
      ],
      "missingVideoOptions": [
        "D"
      ]
    },
    {
      "id": 12,
      "slug": "task-12",
      "title": "Balance the scale",
      "titleStatus": "capitalization_normalized_from_source_heading",
      "goal": "Balance the scale.",
      "sceneDescription": null,
      "sourceQuestion": null,
      "poster": "./posters/task-12.jpg?v=rendering-20260826",
      "posterStatus": "source document",
      "sensorModality": null,
      "tags": [],
      "passiveSensorObservation": null,
      "rgbAmbiguity": null,
      "creativeRationale": null,
      "preferredOption": null,
      "preferredStatus": "not_explicit_in_source",
      "options": [
        {
          "label": "A",
          "strategy": "Place a cube with a similar color on the empty side of the scale.",
          "rationaleLabel": null,
          "title": null,
          "description": "Place a cube with a similar color on the empty side of the scale.",
          "rationale": null,
          "video": "Task 12/A.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "A.mp4"
        },
        {
          "label": "B",
          "strategy": "Press down on the empty side of the scale with the gripper until the scale is balanced.",
          "rationaleLabel": null,
          "title": null,
          "description": "Press down on the empty side of the scale with the gripper until the scale is balanced.",
          "rationale": null,
          "video": "Task 12/B.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "B.mp4"
        },
        {
          "label": "C",
          "strategy": "Remove the cube from the loaded side of the scale.",
          "rationaleLabel": null,
          "title": null,
          "description": "Remove the cube from the loaded side of the scale.",
          "rationale": null,
          "video": "Task 12/C.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "C.mp4"
        },
        {
          "label": "D",
          "strategy": "Place a cube with a similar size on the empty side of the scale.",
          "rationaleLabel": null,
          "title": null,
          "description": "Place a cube with a similar size on the empty side of the scale.",
          "rationale": null,
          "video": "Task 12/D.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "D.mp4"
        }
      ],
      "realWorldOutcome": null,
      "modelRankings": {
        "rgbOnly": [],
        "rgbSensor": []
      },
      "sourceRecordingReferences": [],
      "sourceNotes": [
        "No separate scene description, ranking question, option rationales, or recording filenames were provided."
      ],
      "editorialNotes": [],
      "actualVideoInventory": [
        {
          "filename": "A.mp4",
          "sizeBytes": 26973626,
          "option": "A",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "B.mp4",
          "sizeBytes": 16297424,
          "option": "B",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "C.mp4",
          "sizeBytes": 26079943,
          "option": "C",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "D.mp4",
          "sizeBytes": 44042064,
          "option": "D",
          "mappingStatus": "mapped from A/B/C/D filename"
        }
      ],
      "missingVideoOptions": []
    },
    {
      "id": 13,
      "slug": "task-13",
      "title": "Move the box to the green target area while avoiding the high-friction rubber mat",
      "titleStatus": "verbatim_from_source_heading",
      "goal": "Move the box to the green target area while avoiding the high-friction rubber mat.",
      "sceneDescription": null,
      "sourceQuestion": null,
      "poster": "./posters/task-13.png?v=rendering-20260826",
      "posterStatus": "user-provided poster",
      "sensorModality": null,
      "tags": [],
      "passiveSensorObservation": null,
      "rgbAmbiguity": null,
      "creativeRationale": null,
      "preferredOption": "C",
      "preferredStatus": "explicit_best_marker_in_source",
      "options": [
        {
          "label": "A",
          "strategy": "Push the box straight toward the target with the robot wrist/gripper, taking the shortest direct path across the rubber mat.",
          "rationaleLabel": null,
          "title": null,
          "description": "Push the box straight toward the target with the robot wrist/gripper, taking the shortest direct path across the rubber mat.",
          "rationale": null,
          "video": "Task 13/A.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "A.mp4"
        },
        {
          "label": "B",
          "strategy": "Tilt the box onto one bottom edge and repeatedly pivot or scoot it around the rubber mat toward the green target.",
          "rationaleLabel": null,
          "title": null,
          "description": "Tilt the box onto one bottom edge and repeatedly pivot or scoot it around the rubber mat toward the green target.",
          "rationale": null,
          "video": "Task 13/B.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "B.mp4"
        },
        {
          "label": "C",
          "strategy": "Push the box from an alternative angle with the robot wrist or body surface so it stays on the normal table surface and avoids the rubber mat.",
          "rationaleLabel": null,
          "title": null,
          "description": "Push the box from an alternative angle with the robot wrist or body surface so it stays on the normal table surface and avoids the rubber mat.",
          "rationale": null,
          "video": "Task 13/C.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "C.mp4"
        },
        {
          "label": "D",
          "strategy": "Try to grasp the box with the gripper, lift it, and carry it to the green target.",
          "rationaleLabel": null,
          "title": null,
          "description": "Try to grasp the box with the gripper, lift it, and carry it to the green target.",
          "rationale": null,
          "video": null,
          "videoStatus": "missing",
          "mappingStatus": "missing on disk",
          "actualFilename": null
        }
      ],
      "realWorldOutcome": null,
      "modelRankings": {
        "rgbOnly": [],
        "rgbSensor": []
      },
      "sourceRecordingReferences": [],
      "sourceNotes": [
        "No poster image is embedded for Task 13 in the source document.",
        "The source contains no recording filenames for this task."
      ],
      "editorialNotes": [],
      "actualVideoInventory": [
        {
          "filename": "A.mp4",
          "sizeBytes": 41577592,
          "option": "A",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "B.mp4",
          "sizeBytes": 99370692,
          "option": "B",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "C.mp4",
          "sizeBytes": 57670141,
          "option": "C",
          "mappingStatus": "mapped from A/B/C/D filename"
        }
      ],
      "missingVideoOptions": [
        "D"
      ]
    },
    {
      "id": 14,
      "slug": "task-14",
      "title": "Store the toy using one of the available containers",
      "titleStatus": "verbatim_from_source_heading",
      "goal": "Store the toy using one of the available containers.",
      "sceneDescription": null,
      "sourceQuestion": null,
      "poster": "./posters/task-14.jpg?v=rendering-20260826",
      "posterStatus": "source document",
      "sensorModality": null,
      "tags": [],
      "passiveSensorObservation": null,
      "rgbAmbiguity": null,
      "creativeRationale": null,
      "preferredOption": null,
      "preferredStatus": "not_explicit_in_source",
      "options": [
        {
          "label": "A",
          "strategy": "Pick up the toy and place it into the transparent cup.",
          "rationaleLabel": "Choosing the container with the visually larger opening",
          "title": "Choosing the container with the visually larger opening",
          "description": "Pick up the toy and place it into the transparent cup.",
          "rationale": "The transparent cup appears to have a large opening, but its body is narrow and provides limited interior space. It is also poorly suited for storing an irregularly shaped soft toy. The toy’s width and protruding parts may cause it to become stuck at the opening.",
          "video": "Task 14/A.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "A.mp4"
        },
        {
          "label": "B",
          "strategy": "Pick up the toy and lower it directly into the shopping bag without changing its shape.",
          "rationaleLabel": "Placing the toy directly into the bag",
          "title": "Placing the toy directly into the bag",
          "description": "Pick up the toy and lower it directly into the shopping bag without changing its shape.",
          "rationale": "This option selects the appropriate container but treats the toy as a rigid object. In its uncompressed shape, the toy may be wider than the bag opening and therefore may not pass through it when lowered directly.",
          "video": "Task 14/B.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "B.mp4"
        },
        {
          "label": "C",
          "strategy": "Place the toy at the opening of the shopping bag, gently compress it, and push it through the opening.",
          "rationaleLabel": "Using the object’s deformability",
          "title": "Using the object’s deformability",
          "description": "Place the toy at the opening of the shopping bag, gently compress it, and push it through the opening.",
          "rationale": "Based on tactile information, the robot recognizes that the toy is soft and compressible. Gently compressing the toy at the bag opening reduces its width, allowing it to pass through the opening and enter the bag.",
          "video": "Task 14/C.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "C.mp4"
        },
        {
          "label": "D",
          "strategy": "Hold the shopping bag open with the gripper while placing the toy inside at the same time.",
          "rationaleLabel": "Using a two-handed operation",
          "title": "Using a two-handed operation",
          "description": "Hold the shopping bag open with the gripper while placing the toy inside at the same time.",
          "rationale": "This approach requires one hand to hold the bag open continuously while the other hand places the toy inside. A single-arm robot cannot perform both actions simultaneously.",
          "video": "Task 14/D.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "D.mp4"
        }
      ],
      "realWorldOutcome": null,
      "modelRankings": {
        "rgbOnly": [],
        "rgbSensor": []
      },
      "sourceRecordingReferences": [
        "recording_tactile_20260806_144201.mp4",
        "recording_tactile_20260806_144809.mp4",
        "recording_tactile_20260806_145405.mp4",
        "recording_tactile_20260806_150108.mp4"
      ],
      "sourceNotes": [
        "The source rationale explicitly refers to tactile information, but it does not explicitly mark a preferred option."
      ],
      "editorialNotes": [],
      "actualVideoInventory": [
        {
          "filename": "A.mp4",
          "sizeBytes": 41913308,
          "option": "A",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "B.mp4",
          "sizeBytes": 45171594,
          "option": "B",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "C.mp4",
          "sizeBytes": 60312046,
          "option": "C",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "D.mp4",
          "sizeBytes": 22120293,
          "option": "D",
          "mappingStatus": "mapped from A/B/C/D filename"
        }
      ],
      "missingVideoOptions": []
    },
    {
      "id": 15,
      "slug": "task-15",
      "title": "Put the empty can into the trash bag",
      "titleStatus": "verbatim_from_source_heading",
      "goal": "Put the empty can into the trash bag.",
      "sceneDescription": null,
      "sourceQuestion": null,
      "poster": "./posters/task-15.jpg?v=rendering-20260826",
      "posterStatus": "source document",
      "sensorModality": null,
      "tags": [],
      "passiveSensorObservation": null,
      "rgbAmbiguity": null,
      "creativeRationale": null,
      "preferredOption": null,
      "preferredStatus": "not_explicit_in_source",
      "options": [
        {
          "label": "A",
          "strategy": "Pick up the can on the left and place it into the trash bag.",
          "rationaleLabel": "Selecting the left can directly",
          "title": "Selecting the left can directly",
          "description": "Pick up the can on the left and place it into the trash bag.",
          "rationale": "The robot chooses the left can based only on its visual position, without gathering information about its contents. This succeeds only if the left can happens to be empty.",
          "success": {
            "successes": 2,
            "trials": 5
          },
          "video": "Task 15/A.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "A.mp4"
        },
        {
          "label": "B",
          "strategy": "Pick up the can on the right and place it into the trash bag.",
          "rationaleLabel": "Selecting the right can directly",
          "title": "Selecting the right can directly",
          "description": "Pick up the can on the right and place it into the trash bag.",
          "rationale": "The robot chooses the right can based only on its visual position, without gathering information about its contents. This succeeds only if the right can happens to be empty.",
          "success": {
            "successes": 3,
            "trials": 5
          },
          "video": "Task 15/B.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "B.mp4"
        },
        {
          "label": "C",
          "strategy": "Grasp the two cans one at a time using the same grip command, compare the tactile force readings, and place the can with the lower resistance into the trash bag.",
          "rationaleLabel": "Comparing tactile resistance",
          "title": "Comparing tactile resistance",
          "description": "Grasp the two cans one at a time using the same grip command, compare the tactile force readings, and place the can with the lower resistance into the trash bag.",
          "rationale": "The robot applies the same gentle grasp to each can and compares the tactile force or resistance. An empty can generally offers less structural resistance and may deform slightly under a low grasping force, whereas a filled can resists compression more strongly. This allows the robot to identify the empty can without damaging either one.",
          "success": {
            "successes": 4,
            "trials": 5
          },
          "video": "Task 15/C.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "C.mp4"
        },
        {
          "label": "D",
          "strategy": "Squeeze each can until its shape changes, compare the deformation, and place the more deformed can into the trash bag.",
          "rationaleLabel": "Comparing deformation through forceful squeezing",
          "title": "Comparing deformation through forceful squeezing",
          "description": "Squeeze each can until its shape changes, compare the deformation, and place the more deformed can into the trash bag.",
          "rationale": "The robot can distinguish the cans by squeezing them until visible deformation occurs. However, this applies unnecessary force, may permanently crush the empty can, and could rupture or spill the contents of the filled can.",
          "success": {
            "successes": 3,
            "trials": 5
          },
          "video": "Task 15/D.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "D.mp4"
        }
      ],
      "realWorldOutcome": null,
      "modelRankings": {
        "rgbOnly": [],
        "rgbSensor": []
      },
      "sourceRecordingReferences": [
        "recording_tactile_20260806_152850.mp4",
        "recording_tactile_20260806_153745.mp4",
        "recording_tactile_20260806_154720.mp4",
        "recording_tactile_20260806_155036.mp4"
      ],
      "sourceNotes": [
        "The source rationales discuss tactile force/resistance, but no preferred option is explicitly marked."
      ],
      "editorialNotes": [],
      "actualVideoInventory": [
        {
          "filename": "A.mp4",
          "sizeBytes": 59728466,
          "option": "A",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "B.mp4",
          "sizeBytes": 49745254,
          "option": "B",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "C.mp4",
          "sizeBytes": 82042279,
          "option": "C",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "D.mp4",
          "sizeBytes": 99498125,
          "option": "D",
          "mappingStatus": "mapped from A/B/C/D filename"
        }
      ],
      "missingVideoOptions": []
    },
    {
      "id": 16,
      "slug": "task-16",
      "title": "Move the hot can to the target area",
      "titleStatus": "punctuation_normalized_from_source_heading",
      "goal": "Move the hot can to the target area.",
      "sceneDescription": null,
      "sourceQuestion": null,
      "poster": "./posters/task-16.jpg?v=rendering-20260826",
      "posterStatus": "source document",
      "sensorModality": null,
      "tags": [],
      "passiveSensorObservation": null,
      "rgbAmbiguity": null,
      "creativeRationale": null,
      "preferredOption": null,
      "preferredStatus": "not_explicit_in_source",
      "options": [
        {
          "label": "A",
          "strategy": "Grasp the can directly and place it in the target area.",
          "rationaleLabel": null,
          "title": null,
          "description": "Grasp the can directly and place it in the target area.",
          "rationale": "Directly contacts the hot can.",
          "success": {
            "successes": 2,
            "trials": 5
          },
          "video": "Task 16/A.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "A.mp4"
        },
        {
          "label": "B",
          "strategy": "Wrap the cloth around the can, grasp the wrapped can, and place it in the target area.",
          "rationaleLabel": null,
          "title": null,
          "description": "Wrap the cloth around the can, grasp the wrapped can, and place it in the target area.",
          "rationale": "Provides thermal insulation in principle, but wrapping the can is difficult for a single-arm robot.",
          "success": {
            "successes": 2,
            "trials": 5
          },
          "video": "Task 16/B.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "B.mp4"
        },
        {
          "label": "C",
          "strategy": "Place the cloth in the target area, then grasp the can directly and place it on the cloth.",
          "rationaleLabel": null,
          "title": null,
          "description": "Place the cloth in the target area, then grasp the can directly and place it on the cloth.",
          "rationale": "Protects the table surface, but does not protect the gripper from the hot can.",
          "success": {
            "successes": 4,
            "trials": 5
          },
          "video": "Task 16/C.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "C.mp4"
        },
        {
          "label": "D",
          "strategy": "Place the cloth against the side of the can and use it to push the can into the target area.",
          "rationaleLabel": null,
          "title": null,
          "description": "Place the cloth against the side of the can and use it to push the can into the target area.",
          "rationale": "Uses the cloth as an insulating pushing pad, allowing the robot to move the can without directly grasping it.",
          "success": {
            "successes": 3,
            "trials": 5
          },
          "video": "Task 16/D.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "D.mp4"
        }
      ],
      "realWorldOutcome": null,
      "modelRankings": {
        "rgbOnly": [],
        "rgbSensor": []
      },
      "sourceRecordingReferences": [
        "recording_tactile_20260806_160630.mp4",
        "recording_tactile_20260806_161223.mp4",
        "recording_tactile_20260806_162023.mp4",
        "recording_tactile_20260806_163139.mp4"
      ],
      "sourceNotes": [
        "The rationales compare the thermal implications of each option, but no preferred option is explicitly marked."
      ],
      "editorialNotes": [],
      "actualVideoInventory": [
        {
          "filename": "A.mp4",
          "sizeBytes": 55203179,
          "option": "A",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "B.mp4",
          "sizeBytes": 69141092,
          "option": "B",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "C.mp4",
          "sizeBytes": 74209910,
          "option": "C",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "D.mp4",
          "sizeBytes": 67610266,
          "option": "D",
          "mappingStatus": "mapped from A/B/C/D filename"
        }
      ],
      "missingVideoOptions": []
    },
    {
      "id": 17,
      "slug": "task-17",
      "title": "Place the ball in the target area and keep it stable",
      "titleStatus": "verbatim_from_source_heading",
      "goal": "Place the ball in the target area and keep it stable.",
      "sceneDescription": null,
      "sourceQuestion": null,
      "poster": "./posters/task-17.jpg?v=rendering-20260826",
      "posterStatus": "source document",
      "sensorModality": null,
      "tags": [],
      "passiveSensorObservation": null,
      "rgbAmbiguity": null,
      "creativeRationale": null,
      "preferredOption": null,
      "preferredStatus": "not_explicit_in_source",
      "options": [
        {
          "label": "A",
          "strategy": "Pick up the ball and place it directly in the target area.",
          "rationaleLabel": "Direct placement without stabilization",
          "title": "Direct placement without stabilization",
          "description": "Pick up the ball and place it directly in the target area.",
          "rationale": "The robot places the ball directly in the target area. Because the ball is round, it may roll away after being released, so the task requirement of keeping it stable may not be satisfied.",
          "success": {
            "successes": 1,
            "trials": 5
          },
          "video": "Task 17/A.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "A.mp4"
        },
        {
          "label": "B",
          "strategy": "Place the ball inside the tape roll, then slide the tape roll with the ball into the target area.",
          "rationaleLabel": "Using the tape roll as a movable passive constraint",
          "title": "Using the tape roll as a movable passive constraint",
          "description": "Place the ball inside the tape roll, then slide the tape roll with the ball into the target area.",
          "rationale": "The robot places the ball inside the tape roll, which restricts the ball from rolling, and then slides the tape roll together with the ball into the target area. This provides passive stabilization and is well suited to a single-arm robot.",
          "success": {
            "successes": 5,
            "trials": 5
          },
          "video": "Task 17/B.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "B.mp4"
        },
        {
          "label": "C",
          "strategy": "Place the ball in the target area, then place the tape roll around the ball.",
          "rationaleLabel": "Stabilizing the ball after placing it",
          "title": "Stabilizing the ball after placing it",
          "description": "Place the ball in the target area, then place the tape roll around the ball.",
          "rationale": "The robot first places the ball in the target area and then places the tape roll around it. The ball may roll before the tape roll is positioned, and accurately placing the tape around an already unstable ball requires greater precision.",
          "success": {
            "successes": 3,
            "trials": 5
          },
          "video": "Task 17/C.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "C.mp4"
        },
        {
          "label": "D",
          "strategy": "Attach the tape to the table around the ball to hold it in place.",
          "rationaleLabel": "Using the adhesive property of the tape",
          "title": "Using the adhesive property of the tape",
          "description": "Attach the tape to the table around the ball to hold it in place.",
          "rationale": "The robot uses the tape to attach the ball to the table. Although this can stabilize the ball, manipulating, peeling, stretching, and applying adhesive tape is a difficult deformable-object manipulation task for a single-arm robot.",
          "success": {
            "successes": 0,
            "trials": 5
          },
          "video": "Task 17/D.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "D.mp4"
        }
      ],
      "realWorldOutcome": null,
      "modelRankings": {
        "rgbOnly": [],
        "rgbSensor": []
      },
      "sourceRecordingReferences": [
        "recording_tactile_20260810_134438.mp4",
        "recording_tactile_20260810_134139.mp4",
        "recording_tactile_20260810_135118.mp4",
        "recording_tactile_20260810_135802.mp4",
        "recording_tactile_20260810_140011.mp4",
        "recording_tactile_20260810_140413.mp4",
        "recording_tactile_20260810_140851.mp4"
      ],
      "sourceNotes": [
        "The source lists seven recording filenames for four options; it does not explicitly map recordings to A/B/C/D.",
        "The rationales evaluate all four options, but the source does not explicitly mark a preferred option."
      ],
      "editorialNotes": [],
      "actualVideoInventory": [
        {
          "filename": "A.mp4",
          "sizeBytes": 24889427,
          "option": "A",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "B.mp4",
          "sizeBytes": 49205680,
          "option": "B",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "C.mp4",
          "sizeBytes": 60385288,
          "option": "C",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "D.mp4",
          "sizeBytes": 20909485,
          "option": "D",
          "mappingStatus": "mapped from A/B/C/D filename"
        }
      ],
      "missingVideoOptions": []
    },
    {
      "id": 18,
      "slug": "task-18",
      "title": "Collect the balls in the target area",
      "titleStatus": "capitalization_normalized_from_source_heading",
      "goal": "Collect the balls in the target area.",
      "sceneDescription": null,
      "sourceQuestion": null,
      "poster": "./posters/task-18.jpg?v=rendering-20260826",
      "posterStatus": "source document",
      "sensorModality": null,
      "tags": [],
      "passiveSensorObservation": null,
      "rgbAmbiguity": null,
      "creativeRationale": null,
      "preferredOption": null,
      "preferredStatus": "not_explicit_in_source",
      "options": [
        {
          "label": "A",
          "strategy": "Pick up the three balls one at a time and place them in the target area.",
          "rationaleLabel": "Moving the balls individually",
          "title": "Moving the balls individually",
          "description": "Pick up the three balls one at a time and place them in the target area.",
          "rationale": "The robot picks up each ball and carries it to the target area one at a time. This is a straightforward and reliable strategy, but it requires multiple separate grasp-and-place actions and does not make use of the other available objects.",
          "success": {
            "successes": 1,
            "trials": 5
          },
          "video": "Task 18/A.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "A.mp4"
        },
        {
          "label": "B",
          "strategy": "Place the bowl in the target area, then place the three balls into the bowl one at a time.",
          "rationaleLabel": "Using the bowl as a fixed collection container",
          "title": "Using the bowl as a fixed collection container",
          "description": "Place the bowl in the target area, then place the three balls into the bowl one at a time.",
          "rationale": "The robot first places the bowl in the target area, then transfers the balls into the bowl one by one. The bowl helps keep the balls from rolling away once they reach the target, but the robot still needs to transport each ball separately.",
          "success": {
            "successes": 1,
            "trials": 5
          },
          "video": "Task 18/B.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "B.mp4"
        },
        {
          "label": "C",
          "strategy": "Use the cable to enclose the three balls, then move the enclosed balls into the target area.",
          "rationaleLabel": "Using the cable as a large movable enclosure",
          "title": "Using the cable as a large movable enclosure",
          "description": "Use the cable to enclose the three balls, then move the enclosed balls into the target area.",
          "rationale": "The robot uses the cable to surround all three balls, creating a temporary boundary around them, and then moves the enclosed group toward the target area. This repurposes the cable as a large flexible containment tool and allows multiple balls to be handled together rather than individually.",
          "success": {
            "successes": 4,
            "trials": 5
          },
          "video": "Task 18/C.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "C.mp4"
        },
        {
          "label": "D",
          "strategy": "Place the tape roll around one ball, move the ball together with the tape roll into the target area, and repeat for the remaining balls.",
          "rationaleLabel": "Using the tape roll as a small movable enclosure",
          "title": "Using the tape roll as a small movable enclosure",
          "description": "Place the tape roll around one ball, move the ball together with the tape roll into the target area, and repeat for the remaining balls.",
          "rationale": "The robot places the tape roll around one ball and moves the ball together with the tape roll into the target area, repeating the process for the remaining balls. The tape roll can stabilize and guide a ball during transport, but because it is too small to contain multiple balls at once, the process must be repeated for each ball.",
          "success": {
            "successes": 2,
            "trials": 5
          },
          "video": "Task 18/D.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "D.mp4"
        }
      ],
      "realWorldOutcome": null,
      "modelRankings": {
        "rgbOnly": [],
        "rgbSensor": []
      },
      "sourceRecordingReferences": [
        "recording_tactile_20260810_144333.mp4",
        "recording_tactile_20260810_145023.mp4",
        "recording_tactile_20260810_145629.mp4",
        "recording_tactile_20260810_150108.mp4",
        "recording_tactile_20260810_150918.mp4",
        "recording_tactile_20260810_151856.mp4",
        "recording_tactile_20260810_154106.mp4",
        "recording_tactile_20260810_153939.mp4",
        "recording_tactile_20260810_153539.mp4"
      ],
      "sourceNotes": [
        "The source lists nine recording filenames for four options; it does not explicitly map recordings to A/B/C/D.",
        "The rationales evaluate all four options, but the source does not explicitly mark a preferred option."
      ],
      "editorialNotes": [],
      "actualVideoInventory": [
        {
          "filename": "A.mp4",
          "sizeBytes": 53225910,
          "option": "A",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "B.mp4",
          "sizeBytes": 76014344,
          "option": "B",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "C.mp4",
          "sizeBytes": 35875411,
          "option": "C",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "D.mp4",
          "sizeBytes": 76944301,
          "option": "D",
          "mappingStatus": "mapped from A/B/C/D filename"
        }
      ],
      "missingVideoOptions": []
    },
    {
      "id": 19,
      "slug": "task-19",
      "title": "Move the hot can to the target area",
      "titleStatus": "verbatim_from_source_heading",
      "goal": "Move the hot can to the target area.",
      "sceneDescription": null,
      "sourceQuestion": null,
      "poster": "./posters/task-19.jpg?v=rendering-20260826",
      "posterStatus": "source document",
      "sensorModality": null,
      "tags": [],
      "passiveSensorObservation": null,
      "rgbAmbiguity": null,
      "creativeRationale": null,
      "preferredOption": "C",
      "preferredStatus": "explicit_statement_in_source_rationale",
      "options": [
        {
          "label": "A",
          "strategy": "Grasp the can directly and place it in the target area.",
          "rationaleLabel": null,
          "title": null,
          "description": "Grasp the can directly and place it in the target area.",
          "rationale": "This is the most direct strategy, but the gripper makes direct contact with the hot surface of the can. It does not account for the temperature information.",
          "video": "Task 19/A.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "A.mp4"
        },
        {
          "label": "B",
          "strategy": "Place the tape roll in the target area, then grasp the can directly and place it inside the tape roll.",
          "rationaleLabel": null,
          "title": null,
          "description": "Place the tape roll in the target area, then grasp the can directly and place it inside the tape roll.",
          "rationale": "The tape roll can help stabilize the can after placement, but the robot still has to grasp the hot can directly. Therefore, it does not solve the thermal-contact problem.",
          "video": "Task 19/B.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "B.mp4"
        },
        {
          "label": "C",
          "strategy": "Place the tape roll around the can, then slide the can together with the tape roll into the target area.",
          "rationaleLabel": null,
          "title": null,
          "description": "Place the tape roll around the can, then slide the can together with the tape roll into the target area.",
          "rationale": "This repurposes the tape roll as a movable protective boundary. The robot can manipulate the tape roll instead of directly grasping the hot can, allowing the can to be moved while reducing direct thermal contact. This is the preferred strategy.",
          "video": "Task 19/C.mp4",
          "videoStatus": "available",
          "mappingStatus": "mapped from A/B/C/D filename",
          "actualFilename": "C.mp4"
        },
        {
          "label": "D",
          "strategy": "Wait for the can to cool down, then grasp it directly and place it in the target area.",
          "rationaleLabel": null,
          "title": null,
          "description": "Wait for the can to cool down, then grasp it directly and place it in the target area.",
          "rationale": "Waiting reduces the temperature of the can and eventually makes direct grasping safer. However, it delays task completion and does not make use of the available object to solve the problem immediately.",
          "video": null,
          "videoStatus": "missing",
          "mappingStatus": "missing on disk",
          "actualFilename": null
        }
      ],
      "realWorldOutcome": null,
      "modelRankings": {
        "rgbOnly": [],
        "rgbSensor": []
      },
      "sourceRecordingReferences": [
        "recording_tactile_20260810_160616.mp4",
        "recording_tactile_20260810_162040.mp4",
        "recording_tactile_20260810_162601.mp4"
      ],
      "sourceNotes": [
        "The source lists three recording filenames for four options; it does not explicitly map recordings to A/B/C/D."
      ],
      "editorialNotes": [],
      "actualVideoInventory": [
        {
          "filename": "A.mp4",
          "sizeBytes": 30606184,
          "option": "A",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "B.mp4",
          "sizeBytes": 58406845,
          "option": "B",
          "mappingStatus": "mapped from A/B/C/D filename"
        },
        {
          "filename": "C.mp4",
          "sizeBytes": 43885487,
          "option": "C",
          "mappingStatus": "mapped from A/B/C/D filename"
        }
      ],
      "missingVideoOptions": [
        "D"
      ]
    }
  ]
};

window.CreativeContactBenchTasks.tasks.forEach((task) => {
  task.options.forEach((option) => {
    if (!("success" in option)) option.success = null;
  });
});
