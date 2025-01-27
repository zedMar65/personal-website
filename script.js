function mouse_spark(event) {
    // Get the position of the <h2> element relative to the document
    const titleElement = event.target;  // This refers to the clicked <h2>
    const rect = titleElement.getBoundingClientRect();  // Get its bounding box
    
    // Calculate mouse position relative to the <h2> element
    const x = event.clientX - rect.left;  // Mouse x relative to the <h2>
    const y = event.clientY - rect.top;   // Mouse y relative to the <h2>

    // Create the spark
    const spark = document.createElement('div');
    spark.className = 'spark';
    document.body.appendChild(spark);

    // Set the spark position to the mouse position relative to the <h2>
    spark.style.left = `${rect.left + x - 5}px`;  // Adjust for center positioning
    spark.style.top = `${rect.top + y - 5}px`;    // Adjust for center positioning
    spark.style.position = 'absolute';             // Ensure positioning relative to the body

    // Remove the spark after 1 second (when animation ends)
    setTimeout(() => {
        spark.remove();
    }, 1000);  // Match the animation duration
}

function mouse_spark2(event) {
    // Get the position of the <h2> element relative to the document
    const titleElement = event.target;  // This refers to the clicked <h2>
    const rect = titleElement.getBoundingClientRect();  // Get its bounding box
    
    // Calculate mouse position relative to the <h2> element
    const x = event.clientX - rect.left;  // Mouse x relative to the <h2>
    const y = event.clientY - rect.top;   // Mouse y relative to the <h2>

    // Create the spark
    const spark = document.createElement('div');
    spark.className = 'red-spark';
    document.body.appendChild(spark);

    // Set the spark position to the mouse position relative to the <h2>
    spark.style.left = `${rect.left + x - 5}px`;  // Adjust for center positioning
    spark.style.top = `${rect.top + y - 5}px`;    // Adjust for center positioning
    spark.style.position = 'absolute';             // Ensure positioning relative to the body

    // Remove the spark after 1 second (when animation ends)
    setTimeout(() => {
        spark.remove();
    }, 1000);  // Match the animation duration
}
