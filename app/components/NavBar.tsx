import { NavLink } from "react-router";
import { Form } from "react-router";
import { Button } from "./ui/button";
import { useSubmit } from "react-router";
import { useSearchParams } from "react-router";
import {Search,Heart} from "lucide-react"

export default function NavBar() {
     const submit = useSubmit();
     const [searchParms] = useSearchParams();
     const q = searchParms.get("q");
     const isFirstSearch = q === null
     
    return (
        <div className="">
          <nav className="lg:relative w-[screen] lg:w-auto ">
              <div className="flex justify-between bg-black lg:p-6 p-8 lg:text-[32px] lg:font-semibold lg:pl-20 ">
                <NavLink to="/" className="text-white lg:p-2">Pokedex</NavLink>
                <NavLink to="/favorites" className={`text-white flex items-center gap-2 lg:text-xl lg:mr-20`}><Heart size={22}/>Danh sách yêu thích</NavLink>
              </div>
          <div className="flex items-center justify-center  bg-gray-200 lg:p-8 lg:pl-22 rounded-tl-2xl ">
              <Form method="get" action="/search" >
                <h3 className=" flex items-center justify-center mt-4 lg:text-lg lg:mb-3 mb-6 lg:block font-light">Name of Pokemon</h3>
                <div className="items-center">
                  <input className="border-[1.5px] border-[#a0a0a0]  text-[#666] outline-none lg:w-2xl  mb-4 lg:p-4 p-1  " key={q} defaultValue={q|| ""} type="text" name="q"
                  placeholder="Tìm Pokemon..."
                  onChange={(e) => {
                      submit(e.currentTarget.form,
                        {replace: !isFirstSearch}
                      )
                      
                  }}
                />
                <Button type="submit" className=" lg:relative bottom-1 ml-4 pb-2 lg:p-7 lg:ml-4 lg:mt-4 ">
                  <Search className="size-5.5  relative top-1 lg:static   lg:top-auto     " />
                </Button>
                </div>
                
              </Form>
              

          </div>
      </nav>
      
    </div>

    )
}