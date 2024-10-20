import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User
} from '@nextui-org/react'
import UserInfo from '../cards/UserInfo'
import AddArticle from '../cards/AddArticle'
import UserPassword from '../cards/UserPassword'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Link
} from '@nextui-org/react'
import { Input } from '@nextui-org/react'

export default function UserAvatar ({user,setUpdate}) {

  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { isOpen: iOpen, onOpen: oOpen, onOpenChange: opnChange } = useDisclosure();
  const { isOpen: passIOpen, onOpen: passOOpen, onOpenChange: opnPassChange } = useDisclosure();
  return (
    <>
      <div className='flex items-center gap-4'>
        <Dropdown placement='bottom-start'>
          <DropdownTrigger>
            <User
              as='button'
              avatarProps={{
                isBordered: true,
                src: 'https://i.pravatar.cc/150?u=a042581f4e29026024d'
              }}
              className='transition-transform'
              description={user?.firstName+' '+user?.lastName}
              name={user?.firstName}
            />
          </DropdownTrigger>
          <DropdownMenu
            className='text-black'
            aria-label='User Actions'
            variant='flat'
          >
            <DropdownItem key='profile' className='h-14 gap-2'>
              <p className='font-bold '>Signed in as</p>
              <p className='font-bold'>{user?.firstName}</p>
            </DropdownItem>
        
         <DropdownItem onClick={oOpen} key='settings'>My Info</DropdownItem>
            <DropdownItem onClick={passOOpen} key='team_settings'>Change Password</DropdownItem>
            <DropdownItem onClick={onOpen} key='system'>
              Add Article
            </DropdownItem>

            <DropdownItem key='logout' color='danger'>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <Modal
        size='full'
        className='overflow-y-auto'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement='top-center'
      >
       <AddArticle />
      </Modal>

      <Modal size='xl' isOpen={iOpen} onOpenChange={opnChange} placement='top-center'>
<UserInfo user={user} setUpdate={setUpdate}/>
      </Modal>

      <Modal size='xl' isOpen={passIOpen} onOpenChange={opnPassChange} placement='top-center'>
    <UserPassword/>
      </Modal>
    </>
  )
}
