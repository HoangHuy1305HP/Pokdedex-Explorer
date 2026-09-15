import { TypeDropdown } from "./TypeDropdown";
import ViewToggle from "./ViewToggle";

export default function OptionView() {
    return (
        <div className="gap-8 m-12 ">
            <ViewToggle/>
            <TypeDropdown/>
        </div>
    )
}