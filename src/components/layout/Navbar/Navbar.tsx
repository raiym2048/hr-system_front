import { classNames } from '../../../utils/lib/classNames/classNames'
import cls from './Navbar.module.scss'
import MainIcon from '../../ui/MainIcon/MainIcon'
import { Button, ButtonTheme } from '../../ui/Button/Button'
import '../../../app/style/index.scss'
import { useNavigate } from 'react-router-dom'
import { BsChatLeftDotsFill, BsFillCaretDownFill } from 'react-icons/bs'
import { IoMdNotifications } from 'react-icons/io'
import { FiPlus } from 'react-icons/fi'
import { useAppDispatch, useAppSelector } from '../../../redux/store/store'
import { setNavbar, setProfile, setUser } from '../../../redux/slice/authSlice'
import { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

interface NavbarProps {
  className?: string
}

const Navbar = ({ className }: NavbarProps) => {
  const user = useAppSelector((state) => state.authSlice.user)

  const employerNotifications = useAppSelector((state) => state.authSlice.employerNotification)
  const jobNotifications = useAppSelector((state) => state.authSlice.jobNotification)
  const [modalNavbar, setModalNavbar] = useState(false)
  const [notifications, setNotifications] = useState(false)
  const unreadMessages = useAppSelector((state) => state.chatInformation.unreadMessagesCount)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  console.log(profile)
  console.log(user)

  const clickLogin = () => {
    navigate('login')
    setModalNavbar(false)
  }
  const clickProfile = () => {
    if (user.user.role === 'EMPLOYER') {
      navigate(`/employer`)
    } else if (user.user.role === 'JOB_SEEKER') {
      navigate('/applicant')
    }
    setModalNavbar(false)
  }
  const clickEdit = () => {
    if (user.user.role === 'EMPLOYER') {
      navigate(`/employer/edit`)
    } else if (user.user.role === 'JOB_SEEKER') {
      navigate('/applicant/edit')
    }
    setModalNavbar(false)
  }
  const clickModal = () => {
    setModalNavbar(!modalNavbar)
  }
  const clickLogo = () => {
    navigate('/')
    setModalNavbar(false)
  }

  const clickVacancies = () => {
    navigate(`/employer/vacancies`)
    setModalNavbar(false)

  }

  const clickRegistration = () => {
    localStorage.clear()
    dispatch(setProfile(null))
    dispatch(setUser(null))
    setModalNavbar(false)
    navigate('/registration')
  }
  const clickCreateVacancies = () => {
    navigate('/employer/vacancy/form')
  }
  const clickJob = () => {
    navigate('/applicant/vacancies')
  }

  return (
    <header className={classNames(cls.Navbar, {}, [className ?? ''])}>
      <div className={'container'}>
        <div className={cls.header}>
          <ul className={cls.mainLink}>
            <span onClick={clickLogo}>
              <MainIcon className={cls.links} />
            </span>
            {user?.user?.role === 'EMPLOYER' ? (
              <li onClick={clickVacancies} className={cls.links}>
                Вакансии
              </li>
            ) : (
              ''
            )}

         
            <li className={cls.links}>FAQ</li>
            <li className={cls.links}>Контакты</li>
          </ul>
          {user ? (
            <div className={cls.authNavbar}>
              <div className={cls.navbarIcons}>
                <span onClick={() => navigate('employer/chat')} className={cls.chatNavbar}>
                  {unreadMessages !== null && unreadMessages > 0 && <p>{unreadMessages}</p>}
                  <BsChatLeftDotsFill />
                </span>

                <span
                  onClick={() => setNotifications(!notifications)}
                  className={cls.notificationsNavbar}
                >
                  <p>3</p>
                  <IoMdNotifications />
                </span>
                {notifications ? (
                  user.user?.role === 'EMPLOYER' ? (
                    <div className={cls.modalNotifications}>
                      <div className={cls.notificationsContainer}>
                        <div className="imgNavbar">
                          <img
                            src="https://fikiwiki.com/uploads/posts/2022-02/1644865303_51-fikiwiki-com-p-skachat-kartinki-khoroshego-kachestva-59.jpg"
                            alt=""
                          />
                        </div>

                        <div className={cls.textNotifications}>
                          <h3>employer</h3>
                          <p>
                            Аман Асанов активно ищет работу. Предоставьте ему поддержку в поиске
                            вакансий.
                          </p>
                        </div>
                        <span>
                          <AiOutlineClose />
                        </span>
                      </div>
                    </div>
                  ) : user.user?.role === 'JOB_SEEKER' ? (
                    <div className={cls.modalNotifications}>
                      <div className={cls.notificationsContainer}>
                        <div className="imgNavbar">
                          <img
                            src="https://fikiwiki.com/uploads/posts/2022-02/1644865303_51-fikiwiki-com-p-skachat-kartinki-khoroshego-kachestva-59.jpg"
                            alt=""
                          />
                        </div>

                        <div className={cls.textNotifications}>
                          <h3>job</h3>
                          <p>
                            Аман Асанов активно ищет работу. Предоставьте ему поддержку в поиске
                            вакансий.
                          </p>
                        </div>
                        <span>
                          <AiOutlineClose />
                        </span>
                      </div>
                    </div>
                  ) : user.user?.role === 'ADMIN' ? (
                    <div className={cls.modalNotifications}>
                      <div className={cls.notificationsContainer}>
                        <div className="imgNavbar">
                          <img
                            src="https://fikiwiki.com/uploads/posts/2022-02/1644865303_51-fikiwiki-com-p-skachat-kartinki-khoroshego-kachestva-59.jpg"
                            alt=""
                          />
                        </div>

                        <div className={cls.textNotifications}>
                          <h3>admin</h3>
                          <p>
                            Аман Асанов активно ищет работу. Предоставьте ему поддержку в поиске
                            вакансий.
                          </p>
                        </div>
                        <span>
                          <AiOutlineClose />
                        </span>
                      </div>
                    </div>
                  ) : (
                    ''
                  )
                ) : (
                  ''
                )}
              </div>
              <div className={cls.navbarButton}>
                <Button onClick={clickModal} className={cls.btn_child} theme={ButtonTheme.BLUE_BTN}>
                  {user.user?.fileResponse?.path && (
                    <img className={cls.navbarAvatar} src={user.user?.fileResponse.path} />
                  )}

                  {user.user?.role === 'EMPLOYER'
                    ? user.user?.companyName
                    : user.user?.role === 'JOB_SEEKER'
                    ? user.user?.firstname
                    : ''}

                  <span className={cls.downNavbar}>
                    <BsFillCaretDownFill />
                  </span>
                </Button>
                <div className={cls.modal}>
                  {modalNavbar ? (
                    <ul className={cls.modalNavbar}>
                      <li onClick={clickProfile}>Мой профиль</li>
                      <li onClick={clickEdit}>Настройки</li>
                      <li onClick={clickRegistration}>Выйти</li>
                    </ul>
                  ) : (
                    ''
                  )}
                </div>

                {user.user?.role === 'EMPLOYER' ? (
                  <Button
                    onClick={clickCreateVacancies}
                    className={cls.btn_child1}
                    theme={ButtonTheme.BLUE_BTN}
                  >
                    <span className={cls.navbarPlus}>
                      <FiPlus />
                    </span>
                    Создать вакансию
                  </Button>
                ) : (
                  <Button onClick={clickJob} className={cls.btnJob}>
                    Найти работу
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className={cls.btn}>
              <Button onClick={clickLogin} theme={ButtonTheme.GRAY_BTN} className={cls.btn_child}>
                Войти
              </Button>
              <Button
                onClick={clickRegistration}
                className={cls.btn_child}
                theme={ButtonTheme.BLUE_BTN}
              >
                Регистрация
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
