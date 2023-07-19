import Nav from './Nav';
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm';
import PresentationForm from './PresentationForm';
import AttendConferenceForm from './AttendConferenceForm';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from './MainPage';

function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <>
      <BrowserRouter>
        <Nav />
        {/* <div className="container"> */}
          <Routes>
            {/* <Route path="locations">
              <Route path="new" element={<LocationForm />} />
            </Route>
            <Route path="conferences">
              <Route path="new" element={<ConferenceForm />} />
            </Route>
            <Route path="attendees">
              <Route path="list" element={<AttendeesList attendees={props.attendees} />} />
              <Route path="new" element={<AttendConferenceForm />} />
            </Route> */}
            <Route index element={<MainPage />} />
            <Route path="conferences/new" element={<ConferenceForm />} />
            <Route path="attendees/new" element={<AttendConferenceForm />} />
            <Route path="presentations/new" element={<PresentationForm />} />
            <Route path="locations/new" element={<LocationForm />} />
            <Route path="attendees" element={<AttendeesList attendees={props.attendees} />} />
          </Routes>

        {/* </div> */}
      </BrowserRouter>
    </>
  );
}

export default App;



// function App(props) {
//   if (props.attendees === undefined) {
//     return null;
//   }
//   return (
//     <BrowserRouter>
//       <Nav />
//       <div className="container">
//           <Routes>
            // <Route path="conferences/new" element={<ConferenceForm />} />
            // <Route path="attendees/new" element={<AttendConferenceForm />} />
            // <Route path="locations/new" element={<LocationForm />} />
            // <Route path="attendees" element={<AttendeesList attendees={props.attendees} />} />
//           </Routes>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;
