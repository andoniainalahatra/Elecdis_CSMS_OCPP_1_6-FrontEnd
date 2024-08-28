import React from 'react';
import {Input} from "@/components/ui/input.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";

function EditStation() {
    return (
        <div>
            <form className="space-y-6 max-w-lg mx-auto p-6 bg-transparent shadow-lg rounded-md">
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" type="text" placeholder="Enter your name" className="mt-1"/>
                </div>

                <div>
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" type="text" placeholder="Enter the location" className="mt-1"/>
                </div>

                <div>
                    <Label htmlFor="status">Status</Label>
                    <Select>
                        <SelectTrigger id="status" className="mt-1">
                            <SelectValue placeholder="Select status"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="maintenance">Maintenance</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label htmlFor="power">Power</Label>
                    <Input id="power" type="number" placeholder="Enter power" className="mt-1"/>
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Submit
                </Button>
            </form>


        </div>
    );
}

export default EditStation;