import { FormControl, FormLabel, Radio, RadioGroup, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Stack, Switch } from '@chakra-ui/react'
import React, {
    useState
    , useEffect
} from 'react'
import { words } from '../config/contants'
import { Link } from 'react-router-dom'

const Play = () => {
    const [lang, setLang] = useState()
    const [range, setRange] = useState([0, 900])
    const [playWords, setPlayWords] = useState([])
    const [hide, setHide] = useState(true)
    function selectLang() {
        if (lang == '1') {
            setPlayWords(words.map(item => item.eng))
        }
        else {
            setPlayWords(words.map(item => item.uzb))
        }

    }
    function rangeWords() {
        setPlayWords(playWords.filter((item, index) => (index >= range[0] && index <= range[1])))
    }

    useEffect(() => {
        selectLang()
    }, [lang])


    function start() {
        rangeWords()
        setHide(false)
    }

    const [counter, setCounter] = useState(0)

    function handleSubmit(e) {
        e.preventDefault()
        const value = e.target['input'].value
        console.log(playWords[counter])
        if (lang === '1') {
            if (value.toLowerCase()
                     .trim() == words.find((item, index) => item.eng == playWords[counter])
                .uzb.toLowerCase()) {
                setCounter(counter + 1)
            }
            else {
                console.log(false)
            }
        }
        else {
            if (value.toLowerCase()
                     .trim() == words.find((item, index) => item.uzb == playWords[counter]).eng.toLowerCase()) {
                setCounter(counter + 1)
            }
            else {
                console.log(false)
            }
        }
        e.target.reset()
    }

    return (
        <div className='flex flex-col justify-center items-center'>
            <div className={`py-[20px] ${hide ? 'flex' : 'hidden'} w-full flex-col items-center gap-[20px]`}>
                <div className='flex justify-center gap-[20px] border-[1px] border-gray-400 py-[15px] w-[90%] rounded-md'>
                    <RadioGroup onChange={setLang} value={lang}>
                        <Stack direction='column'>
                            <Radio value='1' >Eng - Uzb</Radio>
                            <Radio value='2'>Uzb - Eng</Radio>
                        </Stack>
                    </RadioGroup>
                </div>

                <div className='flex justify-center gap-[20px] border-[1px] border-gray-400 py-[15px] w-[90%] rounded-md px-[20px]'>
                    <FormControl display='flex' justifyContent={'space-between'}>
                        <FormLabel htmlFor='mixed' mb='0'>
                            Mix it up?
                        </FormLabel>
                        <Switch id='mixed' onChange={() => console.log('true')} />
                    </FormControl>
                </div>

                <div className='flex flex-col justify-center gap-[20px] border-[1px] border-gray-400 py-[15px] rounded-md w-[90%] px-[30px]'>
                    <div className='w-full flex justify-between text-[20px] text-blue-500'>
                        <span>{range[0]}</span>
                        <span>{range[1]}</span>
                    </div>
                    <RangeSlider min={0} max={900} step={10} aria-label={['min', 'max']} defaultValue={[range[0], range[1]]} onChange={(val) => setRange(val)}>
                        <RangeSliderTrack>
                            <RangeSliderFilledTrack />
                        </RangeSliderTrack>
                        <RangeSliderThumb index={0} />
                        <RangeSliderThumb index={1} />
                    </RangeSlider>
                </div>
                <div className='mt-[30px]'>
                    <button onClick={() => start()} className='btn px-[40px] py-[15px] text-[20px] rounded-md text-white font-bold bg-blue-400 shadow-[0_0_10px_rgb(0,176,255)]'>Start</button>
                </div>
            </div>
            <div className={`${hide ? 'hidden' : 'flex'} flex-col w-[90%] py-[30px]`}>
                <div className='w-full text-center border-b-[1px] mb-[30px] py-[10px]'>
                    {counter+1}. {playWords[counter]}
                </div>
                <form onSubmit={(e) => handleSubmit(e)} className='w-full flex justify-between items-center gap-[20px]'>
                    <input id='input' type="text" className='w-full outline-none bg-transparent px-[20px] py-[10px] border-[1px] rounded-md border-blue-500' />
                    <button type='submit' className='bg-blue-500 px-[20px] py-[10px] rounded-md'>Send</button>
                </form>

                <div className='flex justify-center items-center my-[30px] gap-[30px]'>
                    <Link to='/' className='w-[50%]'>
                        <button className='bg-blue-500 w-full py-[10px] hover:scale-[1.02] duration-200 active:scale-[0.98] rounded-md'>Restart</button>
                    </Link>
                    <button onClick={() => setCounter(counter + 1)} className='bg-blue-500 w-[50%] py-[10px] hover:scale-[1.02] duration-200 active:scale-[0.98] rounded-md'>Next word</button>
                </div>
            </div>
        </div>
    )
}

export default Play
