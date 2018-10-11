import {createStackNavigator} from 'react-navigation';
import LoginScreen from "../screens/login";
import RegisterScreen from "../screens/register";
import NotesScreen from "../screens/notes";
import CreateNoteScreen from "../screens/createNote";

exports.RootStack = createStackNavigator(
    {
        Login: {screen: LoginScreen},
        Registration: {screen: RegisterScreen},
        Notes: {screen: NotesScreen},
        CreateNote: {screen: CreateNoteScreen}
    },
    {
        initialRouteName: 'Registration'
    }
);

//
//
// <List>
//     {
//         this.state.notes.map((note, i) => (
//
//             <ListItem
//                 roundAvatar
//                 key = {i}
//                 title = {note.author}
//                 subtitle = {note.message}
//             />
//         ))
//     }
// </List>
