import { RulesConf, RulesType } from './typing'

export default function useRulesType(data, opts: RulesConf = new RulesConf()) {
  const isTypePoint24 = computed(() => data[opts.type] === RulesType.GAME_POINT24)
  const isTypeLearnEngWord = computed(() => data[opts.type] === RulesType.LEARN_ENG_WORD)

  return { isTypePoint24, isTypeLearnEngWord }
}
