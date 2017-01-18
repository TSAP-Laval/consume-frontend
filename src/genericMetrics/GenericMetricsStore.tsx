import {EventEmitter} from "events"

// Represent all generic metrics data management.
class GenericMetricsStore extends EventEmitter{
    
     constructor() {
        super();
    }

    // 
    getAllMetrics(){
    }
    
}

const genericMetricsStore = new GenericMetricsStore;

// Export the new created store.
export default genericMetricsStore;