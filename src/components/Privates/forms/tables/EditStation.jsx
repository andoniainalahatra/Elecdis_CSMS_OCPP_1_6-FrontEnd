import React from 'react';
import {Input} from "@/components/ui/input.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import FloatingLabelInput from "@/components/Privates/forms/FloatingLabelInput.jsx";

function EditStation() {
    return (
        <div className=" text-left w-full m-3 md:w-[30vw]  ">
            <form
                className="flex flex-col max-md:h-screen max-md:justify-center max-md:items-center  space-y-6 p-6 bg-[#fefefe]  shadow-lg rounded-md">
                <div className="w-full " >
                    {/*<Label htmlFor="name" className="text-primaryChart ">Name</Label>*/}
                    {/*<Input id="name" type="text" placeholder="Enter your name" className="mt-1"/>*/}
                    <FloatingLabelInput label="Name" id="name" type="text"/>
                </div>

                <div className="w-full">
                    {/*<Label htmlFor="location" className="text-primaryChart ">Location</Label>*/}
                    {/*<Input id="location" type="text" placeholder="Enter the location" className="mt-1"/>*/}
                    <FloatingLabelInput label="Location" name="location"/>
                </div>

                <div className="w-full">
                    <FloatingLabelInput label="Status" name="status" type="select"/>
                </div>

                <div className="w-full">
                    <FloatingLabelInput label="Power" type="number" />
                </div>

                <Button type="submit" className="w-full bg-primaryChart hover:bg-blue-700 text-white">
                    Submit
                </Button>
            </form>


        </div>
    );
}

export default EditStation;