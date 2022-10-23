import './Article.css'
import { NavLink } from 'react-router-dom';

export default function Article () {
    return (
        <div className="article">
            <div className="article-inner-container">
                <h4><NavLink>r/SubredditTitle</NavLink> by u/userName {/* grab data here for username and time*/} hours ago </h4>
                
                
                <div className="article-body">
                    <h2>Article title that will usually describe the post that it is a part of</h2>
                    IF THERE IS AN IMAGE, THE IMAGE WILL APPEAR HERE. IF IT IS JUST A BODY OF TEXT, THAT WILL ALSO APPEAR HERE,
                    UNLESS IT IS SUPER LONG, THEN IT WILL JUST STOP AFTER A SET AMOUNT OF PAGE REAL ESTATE IS TAKEN UP AND THEN AN ELLIPSE
                    AND "READ MORE" BUTTON WILL APPEAR AT THE BOTTOM WHERE YOU CAN CLICK IT EXPAND THE POST.
                    <br></br>
                    | <br></br>
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    <br></br>
                    | <br></br>
                    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"<br></br>
                </div>
            </div>
        </div>
    )
}