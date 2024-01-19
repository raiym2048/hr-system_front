import { classNames } from '../../../../utils/lib/classNames/classNames'
import cls from './CandidateCard.module.scss'
import {Avatar} from "../../../../components/ui/Avatar/Avatar";
import {FcBookmark} from "react-icons/fc"
import {PiBookmarkSimpleLight} from "react-icons/pi"
import {Text, TextStyle} from "../../../../components/ui/Text/Text";
import {Button, ButtonTheme} from "../../../../components/ui/Button/Button";
import {ICandidate} from "../../type/candidateSchema";
import {useAppDispatch} from "../../../../redux/store/store";
import {fetchCandidateFavorite} from "../../services/fetchCandidateList";
import {baseUrl} from "../../../../services/commonVariables";

interface CardProps {
  className?: string
  candidates: ICandidate
}

const CandidateCard = ({className, candidates}: CardProps) => {
    const [image, setImage] = useState<string>('')

    // async function getCandidateAvatar(id) {
    //     try {
    //         const response =await axios.get(`${baseUrl}/file/resume/${3}`);
    //         response.data
    //     } catch (error) {
    //         console.error('Произошла ошибка:', error);
    //     }
    // }

    useEffect(()=>{
        if (candidates.imageId==null){
            setImage('https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile.png')
        }
        // else getCandidateAvatar(candidates.imageId);
    },[candidates.imageId])


  const dispatch = useAppDispatch()
  return (
    <div className={classNames(cls.Card, {}, [className || ''])}>
      <div
        className={cls.card_favorite}
        onClick={() => dispatch(fetchCandidateFavorite(candidates.candidateId))}
      >
        {candidates.red ? <FcBookmark size={'30px'} /> : <PiBookmarkSimpleLight size={'30px'} />}
      </div>
      <Avatar src={candidates.imageId?`${baseUrl}/file/resume/${candidates.imageId}`:`https://cdn.onlinewebfonts.com/svg/img_568657.png`} alt={'icon'} size={100} className={cls.card_avatar} />
      <Text
        text={`${candidates.firstname} ${candidates.lastname}`}
        title={`${
          candidates?.position?.length > 20
            ? candidates?.position?.slice(0, 20) + '...'
            : candidates.position
        }`}
        style={TextStyle.TASK_NAME_JOB}
      />
      <Text
        text={'Опыт работы'}
        title={`${candidates.experience}`}
        style={TextStyle.TEXT_JOB_SEEKER_VACANCY}
      />
      <Text
        text={'Локация'}
        title={`${candidates.city}, ${candidates.country}`}
        style={TextStyle.TEXT_JOB_SEEKER_VACANCY}
      />

      <Button theme={ButtonTheme.SQUARE}>Посмотреть профиль</Button>
    </div>
  )
}

export default CandidateCard
