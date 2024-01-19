
import {classNames} from "../../utils/lib/classNames/classNames";
import cls from './Admin.module.scss'
import {Outlet} from "react-router-dom";

import Sidebar from "../../components/layout/Sidebar/Sidebar";
const Admin = ( ) => {
    return (
        <div className={'container'}>
            <div className={classNames(cls.Admin,{},[])}>
                <div className={cls.admin_sidebar}>
                    <Sidebar/>
                </div>
                <div className={cls.admin_content}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Admin;
